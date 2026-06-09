const { db } =
    require("../databases/DatabaseContext.js");

function EndPointName() {
    return "seller-pickup-locations";
}

async function GetByUser(userId) {

    const sql = `
        SELECT *
        FROM seller_pickup_locations
        WHERE user_id = ?
        ORDER BY id DESC
    `;

    const [rows] =
        await db.execute(sql, [userId]);

    return {
        message: "Success",
        data: rows
    };
}

async function Post(payload) {

    const sql = `
        INSERT INTO seller_pickup_locations
        (
            user_id,
            name,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            zipcode,
            active
        )
        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?
        )
    `;

    const values = [

        payload.user_id,

        payload.name || "",

        payload.street || "",

        payload.number || "",

        payload.complement || "",

        payload.neighborhood || "",

        payload.city || "",

        payload.state || "",

        payload.zipcode || "",

        payload.active ? 1 : 0

    ];

    const [result] =
        await db.execute(sql, values);

    return {

        message: "Created",

        data: result

    };

}

async function Put(payload, id) {

    const sql = `
        UPDATE seller_pickup_locations
        SET

            name=?,

            street=?,

            number=?,

            complement=?,

            neighborhood=?,

            city=?,

            state=?,

            zipcode=?,

            active=?

        WHERE id=?
    `;

    const values = [

        payload.name || "",

        payload.street || "",

        payload.number || "",

        payload.complement || "",

        payload.neighborhood || "",

        payload.city || "",

        payload.state || "",

        payload.zipcode || "",

        payload.active ? 1 : 0,

        id

    ];

    const [result] =
        await db.execute(sql, values);

    return {

        message: "Updated",

        data: result

    };

}

async function Delete(id) {

    const sql = `
        DELETE
        FROM seller_pickup_locations
        WHERE id=?
    `;

    const [result] =
        await db.execute(sql, [id]);

    return {

        message: "Deleted",

        data: result

    };

}

module.exports = {

    EndPointName,

    GetByUser,

    Post,

    Put,

    Delete

};