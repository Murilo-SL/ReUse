const myModel = require("../model/cardsModel");

async function Get(req, res) {
    const responseData = await myModel.Get();
    return responseData;
}

async function GetByUserId(req, res) {
    const user_id = req.params.user_id;
    const responseData = await myModel.GetByUserId(user_id);
    return responseData;
}

async function Post(req, res) {
    const payload = req.body;
    const responseData = await myModel.Post(payload);
    return responseData;
}

async function Put(req, res) {
    const id = req.params.id;
    const payload = req.body;

    const responseData =
        await myModel.Put(payload, id);

    return responseData;
}

async function Delete(req, res) {
    const id = req.params.id;
    const responseData = await myModel.Delete(id);
    return responseData;
}

function EndPointName() {
    return myModel.EndPointName();
}

module.exports = {
    Get,
    GetByUserId,
    Post,
    Put,
    Delete,
    EndPointName
};