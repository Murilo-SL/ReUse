// switch das rotas
const Routes = require("express");
const usersRoutes = require("./usersRoutes");
const contatosRoutes = require("./contatosRoutes")
const uploadsRoutes = require("./uploadsRoutes");
const authRoutes  = require("./authRoutes");

const routes = Routes() ;

routes.use( usersRoutes );
routes.use( contatosRoutes) ;
routes.use( uploadsRoutes) ;
routes.use( authRoutes );


routes.get("/test", (req,res) => { 
    //codigo
    res.status(206).json( { "message":"servidor Rodando ..."} );

} );

module.exports = routes;