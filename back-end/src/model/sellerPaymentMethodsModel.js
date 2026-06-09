const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "seller-payment-methods";
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT *
        FROM seller_payment_methods
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
        UPDATE seller_payment_methods
        SET
            pix = ?,
            credit_card = ?,
            debit_card = ?,
            boleto = ?,
            cash = ?,
            bank_transfer = ?
        WHERE user_id = ?
    `;

    const updateValues = [
        payload.pix ? 1 : 0,
        payload.credit_card ? 1 : 0,
        payload.debit_card ? 1 : 0,
        payload.boleto ? 1 : 0,
        payload.cash ? 1 : 0,
        payload.bank_transfer ? 1 : 0,
        userId
    ];

    const [updateResult] =
        await db.execute(updateSql, updateValues);

    if (updateResult.affectedRows === 0) {

        const insertSql = `
            INSERT INTO seller_payment_methods
            (
                user_id,
                pix,
                credit_card,
                debit_card,
                boleto,
                cash,
                bank_transfer
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
            userId,
            payload.pix ? 1 : 0,
            payload.credit_card ? 1 : 0,
            payload.debit_card ? 1 : 0,
            payload.boleto ? 1 : 0,
            payload.cash ? 1 : 0,
            payload.bank_transfer ? 1 : 0
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