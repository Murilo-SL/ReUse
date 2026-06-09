const { db } = require("../databases/DatabaseContext.js");

const tableName = "addresses";

async function Get() {
    const sqlText = `
        SELECT *
        FROM ${tableName}
        ORDER BY id
    `;

    const [result] = await db.execute(sqlText);

    return {
        message: "Success",
        data: result
    };
}

async function GetByUserId(user_id) {
    const sqlText = `
        SELECT *
        FROM ${tableName}
        WHERE user_id = ?
        ORDER BY is_primary DESC, id DESC
    `;

    const [result] = await db.execute(sqlText, [user_id]);

    return {
        message: "Success",
        data: result
    };
}

async function Post(payload) {
    const sqlText = `
        INSERT INTO ${tableName}
        (
            user_id,
            address_name,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            zip_code,
            phone,
            is_primary
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        payload.user_id,
        payload.address_name,
        payload.street,
        payload.number,
        payload.complement || "",
        payload.neighborhood || "",
        payload.city,
        payload.state,
        payload.zip_code || "",
        payload.phone || "",
        payload.is_primary || false
    ];

    const [result] = await db.execute(sqlText, values);

    return {
        message: "Success",
        data: result
    };
}

async function Put(payload, id) {

    const sqlText = `
        UPDATE addresses
        SET
            address_name = ?,
            street = ?,
            number = ?,
            complement = ?,
            neighborhood = ?,
            city = ?,
            state = ?,
            zip_code = ?,
            phone = ?,
            is_primary = ?
        WHERE id = ?
    `;

    const values = [
        payload.address_name,
        payload.street,
        payload.number,
        payload.complement || "",
        payload.neighborhood || "",
        payload.city,
        payload.state,
        payload.zip_code || "",
        payload.phone || "",
        payload.is_primary || false,
        id
    ];

    const [result] = await db.execute(sqlText, values);

    return {
        message: "Success",
        data: result
    };
}

async function Delete(id) {
    const sqlText = `
        DELETE FROM ${tableName}
        WHERE id = ?
    `;

    const [result] = await db.execute(sqlText, [id]);

    return {
        message: "Success",
        data: result
    };
}

function EndPointName() {
    return tableName;
}

module.exports = {
    Get,
    GetByUserId,
    Post,
    Put,
    Delete,
    EndPointName
};