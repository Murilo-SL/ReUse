// switch das rotas
const Routes = require("express");

const usersRoutes = require("./usersRoutes");
const contatosRoutes = require("./contatosRoutes");
const uploadsRoutes = require("./uploadsRoutes");
const authRoutes = require("./authRoutes");
const cardsRoutes = require("./cardsRoutes");
const addressesRoutes = require("./addressesRoutes");
const productsRoutes = require("./productsRoutes");
const favoritesRoutes = require("./favoritesRoutes");
const cartRoutes = require("./cartRoutes");
const sellerProfilesRoutes = require("./sellerProfilesRoutes");
const sellerAddressesRoutes = require("./sellerAddressesRoutes");
const sellerSchedulesRoutes = require("./sellerSchedulesRoutes");
const sellerPaymentMethodsRoutes = require("./sellerPaymentMethodsRoutes");
const sellerShippingMethodsRoutes = require("./sellerShippingMethodsRoutes");
const sellerPickupLocationsRoutes = require("./sellerPickupLocationsRoutes");



// NOVAS ROTAS
const sellersRoutes = require("./sellersRoutes");
const institutionsRoutes = require("./institutionsRoutes");

const routes = Routes();

routes.use(usersRoutes);
routes.use(contatosRoutes);
routes.use(uploadsRoutes);
routes.use(authRoutes);
routes.use(cardsRoutes);
routes.use(addressesRoutes);
routes.use(productsRoutes);
routes.use(favoritesRoutes);
routes.use(cartRoutes);
routes.use(sellerProfilesRoutes);
routes.use(sellerAddressesRoutes);
routes.use(sellerSchedulesRoutes);
routes.use(sellerPaymentMethodsRoutes);
routes.use(sellerShippingMethodsRoutes);
routes.use(sellerPickupLocationsRoutes);

// NOVAS ROTAS
routes.use(sellersRoutes);
routes.use(institutionsRoutes);

routes.get("/test", (req, res) => {

    res.status(206).json({
        message: "servidor Rodando ..."
    });

});

module.exports = routes;