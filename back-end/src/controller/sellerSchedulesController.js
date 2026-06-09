const myModel =
    require("../model/sellerSchedulesModel");

function EndPointName() {
    return myModel.EndPointName();
}

async function GetByUser(req, res) {
    return await myModel.GetByUser(
        req.params.userId
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
    Put
};