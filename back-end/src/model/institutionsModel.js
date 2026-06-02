const { db } = require("../databases/DatabaseContext.js");
const {
  valuesParams,
  extrair_dados,
  gerar_sqlFields,
  gerar_sqlParams,
  gerar_sqlSets
} = require("../utils/sqlcomandos.js");

const tableName = 'institutions';

async function Get() {
  const sqlText = `SELECT * FROM ${tableName} ORDER BY id`;
  const [result] = await db.execute(sqlText);
  return { message: "Success", data: result };
}

async function GetById(id) {
  const sqlText = `SELECT * FROM ${tableName} WHERE id = ?`;
  const [result] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

async function Post(payload) {

  if (!payload)
    return { message: "Error", data: "Dados não informado !" };

  extrair_dados(payload);

  const local_fields = gerar_sqlFields();
  const local_params = gerar_sqlParams();
  const valuessql = valuesParams();

  const sqlText =
    `INSERT INTO ${tableName} (${local_fields}) VALUES (${local_params})`;

  const [result] = await db.execute(sqlText, valuessql);

  return { message: "Success", data: result };
}

async function Put(payload, id) {

  if (!payload)
    return { message: "Error", data: "Dados não informado !" };

  extrair_dados(payload);

  const local_sets = gerar_sqlSets();
  const local_values = valuesParams();

  local_values.push(id);

  const sqlText =
    `UPDATE ${tableName} SET ${local_sets} WHERE id = ?`;

  const [result] =
    await db.execute(sqlText, local_values);

  return { message: "Success", data: result };
}

async function Delete(id) {

  const sqlText =
    `DELETE FROM ${tableName} WHERE id = ?`;

  const [result] =
    await db.execute(sqlText, [id]);

  return { message: "Success", data: result };
}

function EndPointName() {
  return tableName;
}

module.exports = {
  Get,
  GetById,
  Post,
  Put,
  Delete,
  EndPointName
};