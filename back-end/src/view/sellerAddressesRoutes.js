const Routes =
    require("express");

const myController =
    require("../controller/sellerAddressesController");

const routes =
    Routes();

const endPoint =
    `/${myController.EndPointName()}`;

routes.get(
    `${endPoint}/user/:userId`,
    async (req, res) => {

        const responseData =
            await myController.GetByUser(
                req,
                res
            );

        res.status(200)
            .json(responseData);
    }
);

routes.put(
    `${endPoint}/user/:userId`,
    async (req, res) => {

        const responseData =
            await myController.Put(
                req,
                res
            );

        res.status(200)
            .json(responseData);
    }
);

module.exports =
    routes;