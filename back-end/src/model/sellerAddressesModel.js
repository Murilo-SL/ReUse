const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "seller-addresses";
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT *
        FROM seller_addresses
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
        UPDATE seller_addresses
        SET
            zipcode = ?,
            street = ?,
            number = ?,
            complement = ?,
            neighborhood = ?,
            city = ?,
            state = ?
        WHERE user_id = ?
    `;

    const updateValues = [
        payload.zipcode || "",
        payload.street || "",
        payload.number || "",
        payload.complement || "",
        payload.neighborhood || "",
        payload.city || "",
        payload.state || "",
        userId
    ];

    const [updateResult] =
        await db.execute(updateSql, updateValues);

    if (updateResult.affectedRows === 0) {

        const insertSql = `
            INSERT INTO seller_addresses
            (
                user_id,
                zipcode,
                street,
                number,
                complement,
                neighborhood,
                city,
                state
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
            userId,
            payload.zipcode || "",
            payload.street || "",
            payload.number || "",
            payload.complement || "",
            payload.neighborhood || "",
            payload.city || "",
            payload.state || ""
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