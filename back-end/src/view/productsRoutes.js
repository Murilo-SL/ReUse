const Routes = require("express");

const myController =
    require("../controller/productsController");

const { uploadProduct } =
    require("../config/uploadConfig");

const routes = Routes();

const endPoint =
    `/${myController.EndPointName()}`;

routes.get(
    endPoint,
    async (req, res) => {

        const responseData =
            await myController.Get(
                req,
                res
            );

        res.status(200)
            .json(responseData);
    }
);

routes.get(
    `${endPoint}/:id`,
    async (req, res) => {

        const responseData =
            await myController.GetById(
                req,
                res
            );

        res.status(200)
            .json(responseData);
    }
);

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
    uploadProduct.single("image"),
    async (req, res) => {

        if (req.file) {
            req.body.image_url =
                `uploads/products/${req.file.filename}`;
        }

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
    `${endPoint}/:id`,
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

routes.post(
    `${endPoint}/:id/image`,
    uploadProduct.single("image"),
    async (req, res) => {

        const responseData =
            await myController.UpdateProductImage(
                req,
                res
            );

        res.status(200)
            .json(responseData);
    }
);

routes.delete(
    `${endPoint}/:id`,
    async (req, res) => {

        const responseData =
            await myController.Delete(
                req,
                res
            );

        res.status(200)
            .json(responseData);
    }
);

module.exports = routes;