const myModel =
    require("../model/cartModel");

function EndPointName() {
    return myModel.EndPointName();
}

async function GetByUser(req, res) {
    return await myModel.GetByUser(
        req.params.userId
    );
}

async function Post(req, res) {
    return await myModel.Post(
        req.body
    );
}

async function Put(req, res) {
    return await myModel.Put(
        req.body,
        req.params.id
    );
}

async function Delete(req, res) {
    return await myModel.Delete(
        req.params.userId,
        req.params.productId
    );
}

async function DeleteByUser(req, res) {
    return await myModel.DeleteByUser(
        req.params.userId
    );
}

module.exports = {
    EndPointName,
    GetByUser,
    Post,
    Put,
    Delete,
    DeleteByUser
};