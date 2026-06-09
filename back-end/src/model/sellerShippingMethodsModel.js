const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "seller-shipping-methods";
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT *
        FROM seller_shipping_methods
        WHERE user_id = ?
    `;

    const [rows] =
        await db.execute(sqlText, [userId]);

    return {
        message: "Success",
        data: rows
    };
}

async function Put(payload, userId) {

    const updateSql = `
        UPDATE seller_shipping_methods
        SET
            pickup = ?,
            local_delivery = ?,
            correios = ?,
            carrier = ?,
            free_shipping = ?,
            free_shipping_min_value = ?
        WHERE user_id = ?
    `;

    const updateValues = [
        payload.pickup ? 1 : 0,
        payload.local_delivery ? 1 : 0,
        payload.correios ? 1 : 0,
        payload.carrier ? 1 : 0,
        payload.free_shipping ? 1 : 0,
        payload.free_shipping_min_value || 0,
        userId
    ];

    const [updateResult] =
        await db.execute(updateSql, updateValues);

    if (updateResult.affectedRows === 0) {

        const insertSql = `
            INSERT INTO seller_shipping_methods
            (
                user_id,
                pickup,
                local_delivery,
                correios,
                carrier,
                free_shipping,
                free_shipping_min_value
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
            userId,
            payload.pickup ? 1 : 0,
            payload.local_delivery ? 1 : 0,
            payload.correios ? 1 : 0,
            payload.carrier ? 1 : 0,
            payload.free_shipping ? 1 : 0,
            payload.free_shipping_min_value || 0
        ];

        const [insertResult] =
            await db.execute(insertSql, insertValues);

        return {
            message: "Created",
            data: insertResult
        };
    }

    return {
        message: "Updated",
        data: updateResult
    };
}

module.exports = {
    EndPointName,
    GetByUser,
    Put
};