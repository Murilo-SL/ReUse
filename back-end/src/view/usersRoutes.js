const Routes = require("express");
const myController = require("../controller/usersControllers");

const routes = Routes();

const endPoint = `/${myController.EndPointName()}`;

const { uploadPerfil } =
    require("../config/uploadConfig");

routes.get(endPoint, async (req,res)=>{
   const responseData = await myController.Get(req,res);
   res.status(200).json(responseData);
});

routes.get( `${endPoint}/:id` , async ( req,res ) => {
   const responseData = await myController.GetById(req,res);
   res.status(200).json(responseData);
}
);

routes.post( `${endPoint}/validaremail` , async ( req,res ) => {
   const responseData = await myController.GetByEmail(req,res);
   res.status(200).json(responseData);
}
);

routes.post(endPoint,async (req,res)=>{
   const responseData = await myController.Post(req,res);
   res.status(201).json(responseData);
});

routes.put(`${endPoint}/:id`, async (req,res)=>{
    const responseData = await myController.Put(req,res);
   res.status(201).json(responseData);
});

routes.put(
    `${endPoint}/:id/password`,
    async (req, res) => {

        const responseData =
            await myController.UpdatePassword(
                req,
                res
            );

        res.status(200).json(
            responseData
        );
    }
);

routes.put(
    `${endPoint}/change-password/:id`,
    async (req, res) => {

        const responseData =
            await myController.ChangePassword(
                req,
                res
            );

        res.status(responseData.statusCode || 200)
            .json(responseData);
    }
);

routes.post(

    `${endPoint}/:id/photo`,

    uploadPerfil.single("photo"),

    async (req, res) => {

        const responseData =
            await myController
                .UpdateProfileImage(
                    req,
                    res
                );

        res.status(200)
            .json(responseData);

    }
);

routes.delete(`${endPoint}/:id`,async (req,res)=>{
   const responseData = await myController.Delete(req,res);
   res.status(201).json(responseData);
});

module.exports = routes;