const Routes = require("express");
const myController = require("../controller/authControllers");

const routes = Routes();

//const endPoint = `/${myController.EndPointName()}`;
const endPoint = "/auth"
routes.post( `${endPoint}/login` , async ( req,res ) => {
   const responseData = await myController.Login(req,res);
   res.status(200).json(responseData);
}

);

module.exports = routes;