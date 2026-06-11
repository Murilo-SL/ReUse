const myModel = require("../model/usersModel")
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function Get(req,res){
     const responseData = await myModel.Get(req);
     return responseData;
}

async function GetById(req,res){
  const id = req.params.id;
  const responseData = await myModel.GetById(id);
  return responseData;
}

async function GetByEmail(req,res){
  const {email} = req.body;  
  const responseData = await myModel.GetByEmail(email);
  return responseData;
}


async function Post(req,res){
  const payload = req.body;
  const responseData = await myModel.Post(payload);
  return responseData;
   
}

async function Put(req,res){
  const id = req.params.id;
  const payload = req.body;
  const responseData = await myModel.Put(payload , id);
  return responseData;
   
}

async function UpdatePassword(req, res) {

    const id = req.params.id;

    const {
        currentPassword,
        newPassword
    } = req.body;

    if (!currentPassword || !newPassword) {
        return {
            success: false,
            message: "Informe a senha atual e a nova senha"
        };
    }

    const responseData =
        await myModel.UpdatePassword(
            id,
            currentPassword,
            newPassword
        );

    return responseData;
}

async function ChangePassword(req, res) {

    return await myModel.ChangePassword(
        req.params.id,
        req.body
    );
}

async function UpdateProfileImage(
    req,
    res
) {

    try {

        const id = req.params.id;

        const novoNome =
            `perfil_${Date.now()}.png`;

        const pastaDestino =
            path.join(
                __dirname,
                "../../uploads/perfis"
            );

        const caminhoFinal =
            path.join(
                pastaDestino,
                novoNome
            );

        await sharp(req.file.path)
            .resize(200, 200)
            .png({
                quality: 90
            })
            .toFile(caminhoFinal);

        // remove o arquivo original enviado
        fs.unlinkSync(req.file.path);

        const imagePath =
            `uploads/perfis/${novoNome}`;

        const responseData =
            await myModel.UpdateProfileImage(
                id,
                imagePath
            );

        return {
            success: true,
            image: imagePath,
            data: responseData
        };

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };

    }
}

async function Delete(req,res){
  const id = req.params.id;
  const responseData = await myModel.Delete(id);
  return responseData;
}

function EndPointName(){
  return myModel.EndPointName();
}

module.exports = {
    Get,
    GetById,
    GetByEmail,
    Post,
    Put,
    Delete,
    UpdateProfileImage,
    ChangePassword,
    UpdatePassword,
    EndPointName
}