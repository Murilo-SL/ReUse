const myModel = require("../model/authModel.js");

async function Login(req, res) {

    try {

        const { email, password } = req.body;

        const result = await myModel.Login(email);

        if (!result.success) {
            return res.status(401).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        const usuario = result.data[0];

        if (usuario.password_hash !== password) {
            return res.status(401).json({
                success: false,
                message: "Senha incorreta"
            });
        }

return res.status(200).json({
    success: true,
    message: "Login realizado com sucesso",
    data: {
        id: usuario.id,
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        nomeCompleto: `${usuario.first_name || ""} ${usuario.last_name || ""}`.trim(),
        email: usuario.email,
        user_type: usuario.user_type
    }
});

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor"
        });

    }
}

function EndPointName() {
    return myModel.EndPointName();
}

module.exports = {
    Login,
    EndPointName
};