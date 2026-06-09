const Routes =
    require("express");

const myController =
    require("../controller/sellerProfilesController");

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

routes.post(
    endPoint,
    async (req, res) => {

        const responseData =
            await myController.Post(
                req,
                res
            );

        res.status(201)
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