const Routes = require("express");
const myController = require("../controller/uploadsControllers");
const uploads = require("../utils/upload.js");
const routes = Routes();

// repassa o nome do endpoint para a variavel e monta o endpoint da routa
const endPoint = `/${myController.EndPointName()}`;

routes.get(endPoint, async (req,res)=>{
   const responseData = await myController.Get(req,res);
   res.status(200).json(responseData);
});

routes.get( `${endPoint}/:id` , async ( req,res ) => {
   const responseData = await myController.GetById(req,res);
   res.status(200).json(responseData);
}
);

routes.post(endPoint, async (req,res)=>{
   const responseData = await myController.Post(req,res);
   res.status(201).json(responseData);
});

routes.put(`${endPoint}/:id`, async (req,res)=>{
    const responseData = await myController.Put(req,res);
   res.status(201).json(responseData);
});

routes.delete(`${endPoint}/:id`, async (req,res)=>{
   const responseData = await myController.Delete(req,res);
   res.status(201).json(responseData);
});

routes.post( `${endPoint}/up`, uploads.single('avatar'),  async (req,res)=>{
    
   if (!req.file) {
        res.send('Erro ao fazer upload do arquivo!');
   } else {
        res.send('Arquivo enviado com sucesso!') ;
   }

   const responseData = await myController.Post(req,res);
   res.status(201).json(responseData);
});

module.exports = routes;