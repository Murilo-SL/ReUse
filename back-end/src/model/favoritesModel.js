const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "favorites";
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT
            f.id,
            f.user_id,
            f.product_id,
            p.name,
            p.description,
            p.price,
            p.image_url,
            p.category,
            p.condition_status
        FROM favorites f
        INNER JOIN products p
            ON p.id = f.product_id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
    `;

    const [rows] =
        await db.execute(
            sqlText,
            [userId]
        );

    return {
        message: "Success",
        data: rows
    };
}

async function Post(payload) {

    const sqlText = `
        INSERT INTO favorites
        (
            user_id,
            product_id
        )
        VALUES
        (
            ?, ?
        )
    `;

    const [result] =
        await db.execute(
            sqlText,
            [
                payload.user_id,
                payload.product_id
            ]
        );

    return {
        message: "Success",
        data: result
    };
}

async function Delete(userId, productId) {

    const sqlText = `
        DELETE FROM favorites
        WHERE user_id = ?
        AND product_id = ?
    `;

    const [result] =
        await db.execute(
            sqlText,
            [
                userId,
                productId
            ]
        );

    return {
        message: "Success",
        data: result
    };
}

module.exports = {
    EndPointName,
    GetByUser,
    Post,
    Delete
};