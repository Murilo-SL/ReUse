const myModel = require("../model/usersModel")

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

async function Delete(req,res){
  const id = req.params.id;
  const responseData = await myModel.Delete(id);
  return responseData;
}

function EndPointName(){
  return myModel.EndPointName();
}

module.exports = { Get, GetById, GetByEmail, Post, Put, Delete, EndPointName}