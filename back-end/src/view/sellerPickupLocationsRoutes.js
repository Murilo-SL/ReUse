const express =
require("express");

const routes =
express.Router();

const myController =
require("../controller/sellerPickupLocationsController");

const endPoint =
`/${myController.EndPointName()}`;

routes.get(

`${endPoint}/user/:userId`,

async(req,res)=>{

const responseData=

await myController.GetByUser(

req,

res

);

res
.status(200)
.json(responseData);

}

);

routes.post(

endPoint,

async(req,res)=>{

const responseData=

await myController.Post(

req,

res

);

res
.status(200)
.json(responseData);

}

);

routes.put(

`${endPoint}/:id`,

async(req,res)=>{

const responseData=

await myController.Put(

req,

res

);

res
.status(200)
.json(responseData);

}

);

routes.delete(

`${endPoint}/:id`,

async(req,res)=>{

const responseData=

await myController.Delete(

req,

res

);

res
.status(200)
.json(responseData);

}

);

module.exports=
routes;