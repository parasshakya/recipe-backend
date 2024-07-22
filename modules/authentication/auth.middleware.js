const jwt = require("jsonwebtoken")
const Schema = require("../user/schema")

const verifyUser = async (req, res, next) =>{

try{
    const bearerToken = req.header("Authorization");

    const splittedTokenDetails = bearerToken.split(" ");

    const token = splittedTokenDetails[1];


   if(token){
    const tokenDetails = jwt.verify(token, "RECIPE_WEBSITE");


    const userData = await Schema.findById(tokenDetails.id);

    if(userData){
        req.user = userData;
        next();
    }else{
        res.status(500).send(`User doesn't exist`);
    }
   }else{
    res.status(500).send("Invalid token");
   }

}catch(e){
    res.status(500).send("Please login to continue");
}

    
    







    
}


module.exports = {
    verifyUser
}

