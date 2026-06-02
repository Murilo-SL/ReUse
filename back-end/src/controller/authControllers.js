const myModel = require("../model/authModel.js")

async function Login(req, res ){
    const { email, password} = req.body;
    const result = await myModel.Login( email, password );
    if ( result && result.data.length > 0) {
        
        const {password_hash} = result.data[0];
        
        if ( password_hash === password) {
            return result
        } else {
            return {"message": "Error", "data":[] } 
        }
    } else {
        return {"message": "Error", "data":[] } 
    }
    

}

function EndPointName(){
  return myModel.EndPointName();
}

module.exports = {Login, EndPointName}