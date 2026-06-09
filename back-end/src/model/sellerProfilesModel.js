const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "seller-profiles";
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT *
        FROM seller_profiles
        WHERE user_id = ?
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
        INSERT INTO seller_profiles
        (
            user_id,
            store_name,
            cnpj,
            state_registration,
            phone,
            website,
            description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        payload.user_id,
        payload.store_name || "",
        payload.cnpj || "",
        payload.state_registration || "",
        payload.phone || "",
        payload.website || "",
        payload.description || ""
    ];

    const [result] =
        await db.execute(sqlText, values);

    return {
        message: "Success",
        data: result
    };
}

async function Put(payload, userId) {

    const updateSql = `
        UPDATE seller_profiles
        SET
            store_name = ?,
            cnpj = ?,
            state_registration = ?,
            phone = ?,
            website = ?,
            description = ?
        WHERE user_id = ?
    `;

    const updateValues = [
        payload.store_name || "",
        payload.cnpj || "",
        payload.state_registration || "",
        payload.phone || "",
        payload.website || "",
        payload.description || "",
        userId
    ];

    const [updateResult] =
        await db.execute(
            updateSql,
            updateValues
        );

    if (updateResult.affectedRows === 0) {

        const insertSql = `
            INSERT INTO seller_profiles
            (
                user_id,
                store_name,
                cnpj,
                state_registration,
                phone,
                website,
                description
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
            userId,
            payload.store_name || "",
            payload.cnpj || "",
            payload.state_registration || "",
            payload.phone || "",
            payload.website || "",
            payload.description || ""
        ];

        const [insertResult] =
            await db.execute(
                insertSql,
                insertValues
            );

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
    Post,
    Put
};