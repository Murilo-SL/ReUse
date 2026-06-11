const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// importações do projeto
const uploads = require("./utils/upload.js");
const routes = require("./view/routes");

// instancia o dotenv para uso
dotenv.config();

const PROJETO_NAME =
    process.env.PROJETO_NAME ||
    "Api NodeJs 2026 - DSI";

const Port =
    process.env.API_PORT || 3000;

// instancia express
const app = express();

// banco de dados
const { db } =
    require('./databases/DatabaseContext.js');

// cors
app.use(cors({
    origin: [
        'http://127.0.0.1:5501',
        'http://localhost:5501'
    ]
}));

// json
app.use(express.json());

// rotas
app.use(routes);

// uploads
// uploads
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "..", "uploads")
    )
);

// iniciar servidor
async function startServer() {

    console.log(
        `iniciando banco de dados: ${process.env.DB_TYPE}`
    );

    await db.init();

    app.listen(Port, () => {

        console.log(
            `Servidor rodando na porta: ${Port}`
        );

        console.log(
            `Projeto Integrador 1º 2026 - Fatec Taquaritinga`
        );

        console.log(PROJETO_NAME);

    });

}

startServer();