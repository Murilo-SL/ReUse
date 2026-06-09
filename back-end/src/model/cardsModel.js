const { db } = require("../databases/DatabaseContext.js");

const tableName = "cards";

async function Get() {
    const sqlText = `
        SELECT * FROM ${tableName}
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
        SELECT * FROM ${tableName}
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
    if (!payload) {
        return {
            message: "Error",
            data: "Dados não informados!"
        };
    }

    const sqlText = `
        INSERT INTO ${tableName}
        (
            user_id,
            card_holder,
            card_last_digits,
            card_brand,
            expiry_date,
            is_primary
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        payload.user_id,
        payload.card_holder,
        payload.card_last_digits,
        payload.card_brand,
        payload.expiry_date,
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
        UPDATE cards
        SET
            card_holder = ?,
            card_last_digits = ?,
            card_brand = ?,
            expiry_date = ?,
            is_primary = ?
        WHERE id = ?
    `;

    const values = [
        payload.card_holder,
        payload.card_last_digits,
        payload.card_brand,
        payload.expiry_date,
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
    Put,
    Post,
    Delete,
    EndPointName
};