const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "cart";
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT
            c.id,
            c.user_id,
            c.product_id,
            c.quantity,
            p.name,
            p.description,
            p.price,
            p.image_url,
            p.category,
            p.condition_status
        FROM cart_items c
        INNER JOIN products p
            ON p.id = c.product_id
        WHERE c.user_id = ?
        ORDER BY c.created_at DESC
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
        INSERT INTO cart_items
        (
            user_id,
            product_id,
            quantity
        )
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
            quantity = quantity + VALUES(quantity)
    `;

    const [result] =
        await db.execute(sqlText, [
            payload.user_id,
            payload.product_id,
            payload.quantity || 1
        ]);

    return {
        message: "Success",
        data: result
    };
}

async function Put(payload, id) {

    const sqlText = `
        UPDATE cart_items
        SET quantity = ?
        WHERE id = ?
    `;

    const [result] =
        await db.execute(sqlText, [
            payload.quantity,
            id
        ]);

    return {
        message: "Success",
        data: result
    };
}

async function Delete(userId, productId) {

    const sqlText = `
        DELETE FROM cart_items
        WHERE user_id = ?
        AND product_id = ?
    `;

    const [result] =
        await db.execute(sqlText, [
            userId,
            productId
        ]);

    return {
        message: "Success",
        data: result
    };
}

async function DeleteByUser(userId) {

    const sqlText = `
        DELETE FROM cart_items
        WHERE user_id = ?
    `;

    const [result] =
        await db.execute(sqlText, [userId]);

    return {
        message: "Success",
        data: result
    };
}

module.exports = {
    EndPointName,
    GetByUser,
    Post,
    Put,
    Delete,
    DeleteByUser
};