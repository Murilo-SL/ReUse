const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors") ;
const os = require("os");
const path = require("path");
const { fileURLToPath } = require("url");
// importações do projeto
const uploads = require("./utils/upload.js");
const routes = require("./view/routes");


// instancia o dotenv para uso
dotenv.config();

const PROJETO_NAME = process.env.PROJETO_NAME || "Api NodeJs 2026 - DSI"
// para mudar a porta do servidor
const Port = process.env.API_PORT || 3000;

// instanciar o express no objeto app
const app = express();

// instancia o banco de dados que será utilizado
const { db } = require('./databases/DatabaseContext.js');

//
// inejta o cord no express
//app.use( cors())
app.use(cors({
    origin: [
        'http://127.0.0.1:5501',
        'http://localhost:5501'
    ]
}));

// informa ao express que iremos trabalhar com json
app.use(express.json());

// injeta como midlare routes no express
app.use( routes );

// metodo para visualizar a imagem diretamente na rota da api
// metodo-1 - Servindo arquivos estáticos da pasta "upload"
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', 'uploads'))
);

// // metodo para upload da imagem
// app.post('/upload', uploads.single('avatar'), (req, res) => {
//     if (!req.file) {
//         res.send('Erro ao fazer upload do arquivo!');
//     } else {
//         res.send('Arquivo enviado com sucesso!') ;
//     }
// })

// função para iniciar o servidor e o banco de dados
async function startServer() {

    console.log( `iniciando banco de dados: ${process.env.DB_TYPE}` )
    await db.init();
    
    // carrega a api , deixa a api monitorando a porta informada
    app.listen( Port, ()=>{        
        console.log(`Servidor rodando na porta: ${Port}\n Pressione CRTL+C cancelar servidor!`);
        console.log(`Projeto Integrador 1º 2026 - Fatec Taquaritinga`);
        console.log(`${PROJETO_NAME}`);
    });
   
}

// chamada da função encarregade de subir o servidor
startServer();

