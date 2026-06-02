const user = require("../model/usersModel");

const tableName = 'auth';

async function Login(email) {

    const result = await user.GetByEmail(email);

    if (!result || result.data.length === 0) {
        return {
            success: false,
            data: []
        };
    }

    return {
        success: true,
        data: result.data
    };
}

function Register() {}

function Logout() {}

function TokenVerify() {}

function EndPointName() {
    return tableName;
}

module.exports = {
    Login,
    Register,
    Logout,
    TokenVerify,
    EndPointName
};