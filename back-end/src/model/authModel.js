const user = require("../model/usersModel")

const tableName = 'auth';

async function Login( login, password ){
    // consultando se o email existe no banco
    const result  = await user.GetByEmail(login);
    if ( ! result ){
        // email não existe
        return {"message": "Error", "data":[] } 
    } else {
        // email existe
        return result
    }

}

function Register(){

}

function Logouf(){

}

function TokenVerify(){

}

function EndPointName(){
  return tableName;
}

module.exports = { Login, Register, Logouf, TokenVerify, EndPointName}