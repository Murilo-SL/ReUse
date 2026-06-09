const myModel =
    require("../model/favoritesModel");

function EndPointName() {
    return myModel.EndPointName();
}

async function GetByUser(
    req,
    res
) {

    return await myModel
        .GetByUser(
            req.params.userId
        );
}

async function Post(
    req,
    res
) {

    return await myModel
        .Post(
            req.body
        );
}

async function Delete(
    req,
    res
) {

    return await myModel
        .Delete(
            req.params.userId,
            req.params.productId
        );
}

module.exports = {
    EndPointName,
    GetByUser,
    Post,
    Delete
};