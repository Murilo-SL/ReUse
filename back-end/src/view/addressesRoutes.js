const Routes = require("express");
const myController = require("../controller/addressesController");

const routes = Routes();

const endPoint = `/${myController.EndPointName()}`;

routes.get(endPoint, async (req, res) => {
    const responseData = await myController.Get(req, res);
    res.status(200).json(responseData);
});

routes.get(`${endPoint}/user/:user_id`, async (req, res) => {
    const responseData = await myController.GetByUserId(req, res);
    res.status(200).json(responseData);
});

routes.post(endPoint, async (req, res) => {
    try {
        const responseData = await myController.Post(req, res);
        res.status(201).json(responseData);
    } catch (error) {
        console.error("Erro ao cadastrar endereço:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

routes.put(`${endPoint}/:id`, async (req, res) => {
    try {
        const responseData =
            await myController.Put(req, res);

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

routes.delete(`${endPoint}/:id`, async (req, res) => {
    const responseData = await myController.Delete(req, res);
    res.status(200).json(responseData);
});

module.exports = routes;