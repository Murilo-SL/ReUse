const { db } = require("../databases/DatabaseContext.js");

function EndPointName() {
    return "products";
}

async function Get() {

    const sqlText = `
        SELECT *
        FROM products
        ORDER BY created_at DESC
    `;

    const [rows] =
        await db.execute(sqlText);

    return {
        message: "Success",
        data: rows
    };
}

async function GetById(id) {

    const sqlText = `
        SELECT *
        FROM products
        WHERE id = ?
    `;

    const [rows] =
        await db.execute(sqlText, [id]);

    return {
        message: "Success",
        data: rows
    };
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT *
        FROM products
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    const [rows] =
        await db.execute(sqlText, [userId]);

    return {
        message: "Success",
        data: rows
    };
}

async function Post(payload) {

    const sqlText = `
        INSERT INTO products
        (
            user_id,
            name,
            description,
            price,
            category,
            condition_status,
            image_url,
            status
        )
        VALUES
        (
            ?,?,?,?,?,?,?,?
        )
    `;

    const values = [
        payload.user_id,
        payload.name,
        payload.description,
        payload.price,
        payload.category,
        payload.condition_status,
        payload.image_url,
        payload.status || "ativo"
    ];

    const [result] =
        await db.execute(sqlText, values);

    return {
        message: "Success",
        data: result
    };
}

async function Put(payload, id) {

    const sqlText = `
        UPDATE products
        SET
            name = ?,
            description = ?,
            price = ?,
            category = ?,
            condition_status = ?,
            image_url = ?,
            status = ?
        WHERE id = ?
    `;

    const values = [
        payload.name,
        payload.description,
        payload.price,
        payload.category,
        payload.condition_status,
        payload.image_url,
        payload.status,
        id
    ];

    const [result] =
        await db.execute(sqlText, values);

    return {
        message: "Success",
        data: result
    };
}

async function UpdateProductImage(id, image_url) {

    const sqlText = `
        UPDATE products
        SET image_url = ?
        WHERE id = ?
    `;

    const [result] =
        await db.execute(
            sqlText,
            [image_url, id]
        );

    return {
        message: "Success",
        data: result
    };
}

async function Delete(id) {

    const sqlText = `
        DELETE FROM products
        WHERE id = ?
    `;

    const [result] =
        await db.execute(sqlText, [id]);

    return {
        message: "Success",
        data: result
    };
}

module.exports = {
    EndPointName,
    Get,
    GetById,
    GetByUser,
    Post,
    Put,
    UpdateProductImage,
    Delete
};