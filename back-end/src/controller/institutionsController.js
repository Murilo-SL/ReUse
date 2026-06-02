const myModel = require("../model/institutionsModel");

async function Get(req, res) {
  return await myModel.Get();
}

async function GetById(req, res) {
  return await myModel.GetById(req.params.id);
}

async function Post(req, res) {
  return await myModel.Post(req.body);
}

async function Put(req, res) {
  return await myModel.Put(
    req.body,
    req.params.id
  );
}

async function Delete(req, res) {
  return await myModel.Delete(
    req.params.id
  );
}

function EndPointName() {
  return myModel.EndPointName();
}

module.exports = {
  Get,
  GetById,
  Post,
  Put,
  Delete,
  EndPointName
};