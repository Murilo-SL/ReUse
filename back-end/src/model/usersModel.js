
const { db } = require("../databases/DatabaseContext.js");
const { valuesParams, extrair_dados,  gerar_sqlFields ,
   gerar_sqlParams, gerar_sqlSets } = require( "../utils/sqlcomandos.js")
const tableName = 'users';
// selecionar todos os usuarios 
async function Get(){
  const sqlText = `SELECT * FROM ${tableName} ORDER BY id`;
  const [result, fields] = await db.execute(sqlText); 
  return {"message": "Success", "data":result } 
}

// selecionar um registro pelo id
async function GetById( id ){
  // 
  const sqlText = `SELECT * FROM  ${tableName} WHERE id = ? ORDER BY id`;
  const [result, fields] = await db.execute(sqlText,[id]); 
  return {"message": "Success", "data":result } 
}

async function GetByEmail( email ){
  // 
  const sqlText = `SELECT * FROM  ${tableName} WHERE email = ?`;
  const [result, fields] = await db.execute(sqlText,[email]); 
  console.log( result ) ;
  return {"message": "Success", "data":result } 
}

async function Post(payload){
  // instrução sql para envio ao banco
  if ( !payload)   return {"message": "Error", "data": "Dados não informado !" }
  extrair_dados(payload);
  const local_fields = gerar_sqlFields();
  const local_params = gerar_sqlParams() ;  
  const valuessql = valuesParams();
  const sqlText = `INSERT INTO  ${tableName} ( ${local_fields} ) VALUES ( ${local_params} )`;  
  // executa a consulta no banco de dados
  const [result, fields] = await db.execute( sqlText, valuessql );
  // retorna para a proxima camada os dados dos banco
  return {"message": "Sucess", "data": result }
 
}

async function Put(payload, id){
  // instrução sql para envio ao banco
  if ( !payload)   return {"message": "Error", "data": "Dados não informado !" }
  extrair_dados(payload);
  const local_Sets = gerar_sqlSets(); 
  const local_values = valuesParams() ;
  const sqlText = `UPDATE  ${tableName} SET ${local_Sets} WHERE id = ?`;
  // vetor com os valores para envio ao banco, manter os dados na order das coluna
  // inclui no array/vetor o valor do id na ultima posição
  local_values.push( id );
  // executa a consulta no banco de dados
  
  const [result, fields] = await db.execute( sqlText, local_values );
  // retorna para a proxima camada os dados dos banco
  return {"message": "Sucess", "data": result }
 
}

async function UpdatePassword(id, currentPassword, newPassword) {

    const sqlSelect = `
        SELECT password_hash
        FROM users
        WHERE id = ?
    `;

    const [users] = await db.execute(sqlSelect, [id]);

    if (users.length === 0) {
        return {
            success: false,
            message: "Usuário não encontrado"
        };
    }

    const usuario = users[0];

    if (usuario.password_hash !== currentPassword) {
        return {
            success: false,
            message: "Senha atual incorreta"
        };
    }

    const sqlUpdate = `
        UPDATE users
        SET password_hash = ?
        WHERE id = ?
    `;

    const [result] = await db.execute(
        sqlUpdate,
        [newPassword, id]
    );

    return {
        success: true,
        message: "Senha atualizada com sucesso",
        data: result
    };
}

async function ChangePassword(id, payload) {

    const currentPassword = payload.currentPassword;
    const newPassword = payload.newPassword;

    if (!currentPassword || !newPassword) {
        return {
            statusCode: 400,
            message: "Preencha todos os campos."
        };
    }

    const sqlSelect = `
        SELECT password_hash
        FROM users
        WHERE id = ?
    `;

    const [rows] =
        await db.execute(sqlSelect, [id]);

    if (rows.length === 0) {
        return {
            statusCode: 404,
            message: "Usuário não encontrado."
        };
    }

    if (rows[0].password_hash !== currentPassword) {
        return {
            statusCode: 401,
            message: "Senha atual incorreta."
        };
    }

    const sqlUpdate = `
        UPDATE users
        SET password_hash = ?
        WHERE id = ?
    `;

    const [result] =
        await db.execute(
            sqlUpdate,
            [
                newPassword,
                id
            ]
        );

    return {
        statusCode: 200,
        message: "Senha alterada com sucesso.",
        data: result
    };
}

async function UpdateProfileImage(
    id,
    profile_image
) {

    const sqlText = `
        UPDATE users
        SET profile_image = ?
        WHERE id = ?
    `;

    const [result] =
        await db.execute(
            sqlText,
            [profile_image, id]
        );

    return {
        message: "Success",
        data: result
    };
}

// selecionar um registro pelo id
async function Delete( id ){
  // instrucao sql para excluir um registro
  const sqlText = `DELETE FROM  ${tableName} WHERE id = ?`;
  const [result, fields] = await db.execute(sqlText,[id]); 
  return {"message": "Success", "data":result } 
}

function EndPointName(){
  return tableName;
}

module.exports = {
    Get,
    GetById,
    GetByEmail,
    Post,
    UpdateProfileImage,
    Put,
    Delete,
    UpdatePassword,
    ChangePassword,
    EndPointName
}