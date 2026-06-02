// switch das rotas
const Routes = require("express");

const usersRoutes = require("./usersRoutes");
const contatosRoutes = require("./contatosRoutes");
const uploadsRoutes = require("./uploadsRoutes");
const authRoutes = require("./authRoutes");

// NOVAS ROTAS
const sellersRoutes = require("./sellersRoutes");
const institutionsRoutes = require("./institutionsRoutes");

const routes = Routes();

routes.use(usersRoutes);
routes.use(contatosRoutes);
routes.use(uploadsRoutes);
routes.use(authRoutes);

// NOVAS ROTAS
routes.use(sellersRoutes);
routes.use(institutionsRoutes);

routes.get("/test", (req, res) => {

    res.status(206).json({
        message: "servidor Rodando ..."
    });

});

module.exports = routes;