const myModel =
    require("../model/productsModel");

function EndPointName() {
    return myModel.EndPointName();
}

async function Get(req, res) {
    return await myModel.Get();
}

async function GetById(req, res) {

    return await myModel.GetById(
        req.params.id
    );
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

async function UpdateProductImage(req, res) {

    const id = req.params.id;

    const imagePath =
        req.file.path.replace(
            /\\/g,
            "/"
        );

    const responseData =
        await myModel.UpdateProductImage(
            id,
            imagePath
        );

    return {
        success: true,
        image: imagePath,
        data: responseData
    };
}

async function Delete(req, res) {

    return await myModel.Delete(
        req.params.id
    );
}

module.exports = {
    EndPointName,
    Get,
    GetById,
    GetByUser,
    Post,
    Put,
    UpdateProductImage,
    Delete
};