const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "seller-schedules";
}

async function GetByUser(userId) {

    const sqlText = `
        SELECT *
        FROM seller_schedules
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
        UPDATE seller_schedules
        SET
            monday_friday_open = ?,
            monday_friday_close = ?,
            monday_friday_closed = ?,

            saturday_open = ?,
            saturday_close = ?,
            saturday_closed = ?,

            sunday_closed = ?,
            holidays_closed = ?
        WHERE user_id = ?
    `;

    const updateValues = [
        payload.monday_friday_open || "09:00",
        payload.monday_friday_close || "18:00",
        payload.monday_friday_closed ? 1 : 0,

        payload.saturday_open || "09:00",
        payload.saturday_close || "13:00",
        payload.saturday_closed ? 1 : 0,

        payload.sunday_closed ? 1 : 0,
        payload.holidays_closed ? 1 : 0,

        userId
    ];

    const [updateResult] =
        await db.execute(updateSql, updateValues);

    if (updateResult.affectedRows === 0) {

        const insertSql = `
            INSERT INTO seller_schedules
            (
                user_id,
                monday_friday_open,
                monday_friday_close,
                monday_friday_closed,
                saturday_open,
                saturday_close,
                saturday_closed,
                sunday_closed,
                holidays_closed
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
            userId,

            payload.monday_friday_open || "09:00",
            payload.monday_friday_close || "18:00",
            payload.monday_friday_closed ? 1 : 0,

            payload.saturday_open || "09:00",
            payload.saturday_close || "13:00",
            payload.saturday_closed ? 1 : 0,

            payload.sunday_closed ? 1 : 0,
            payload.holidays_closed ? 1 : 0
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