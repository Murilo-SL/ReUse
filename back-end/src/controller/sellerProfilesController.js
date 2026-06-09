const myModel =
    require("../model/sellerProfilesModel");

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
        req.params.userId
    );
}

module.exports = {
    EndPointName,
    GetByUser,
    Post,
    Put
};