const multer = require("multer");
const path = require("path");

// =========================
// FOTO DE PERFIL
// =========================

const perfilStorage = multer.diskStorage({

    destination: (req, file, cb) => {

cb(
    null,
    "uploads/perfis"
);

    },

    filename: (req, file, cb) => {

        cb(
            null,
            "perfil_" +
            Date.now() +
            path.extname(
                file.originalname
            )
        );

    }

});

const uploadPerfil = multer({
    storage: perfilStorage
});

// =========================
// FOTO DE PRODUTO
// =========================

const productStorage = multer.diskStorage({

    destination: (req, file, cb) => {

cb(
    null,
    "uploads/products"
);

    },

    filename: (req, file, cb) => {

        cb(
            null,
            "product_" +
            Date.now() +
            path.extname(
                file.originalname
            )
        );

    }

});

const uploadProduct = multer({
    storage: productStorage
});

// =========================
// EXPORTS
// =========================

module.exports = {
    uploadPerfil,
    uploadProduct
};