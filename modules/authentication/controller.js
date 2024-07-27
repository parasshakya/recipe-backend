const bcrypt = require("bcrypt")
const Schema = require("../user/schema")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")


const signUp = async (req, res) =>{

  try{
    const userData = {
      ...req.body, image: req.file.filename
    }
  
    const hashedPassword = await bcrypt.hash(userData.password, 10);
  
    userData.password = hashedPassword;
  
    const user = await Schema.create(userData);

    const tokenDetails = {
      id: user._id,
      email: user.email
    }

    const expiryDetails = {
      expiresIn: "30d"
    }

    const token = jwt.sign(tokenDetails, "RECIPE_WEBSITE", expiryDetails );


  
    res.send({
      status: 200,
      message: "Sign Up Successful",
      data: {
        userData: user,
        token: token
      }
  
    });
  
  
  }catch(e){
    console.log(e);
    res.status(500).send("Error Signing Up");
  }



}

const login = async (req, res) =>{

  try{
    

    const userDetails = await Schema.findOne({
      email: req.body.email
    });

    if(userDetails){
      
      const isPasswordSame = bcrypt.compare(req.body.password, userDetails.password);

      if(isPasswordSame){
        const tokenDetails = {
          id: userDetails._id,
          email: userDetails.email
        }

        const expiryDetails = {
          expiresIn: "30d"
        }

        const token = jwt.sign(tokenDetails, "RECIPE_WEBSITE", expiryDetails );

        


        

        res.send({
          status: 200,
          message: "Login Successful",
          data: {
            details:userDetails,
            token: token
          }
      
        });
      }else{
        res.status(500).send('Incorrect Password');
      }
    }else{
      res.status(500).send("User doesn't exist for the provided email");
    }
  

  
  
  
  
  
  }catch(e){
    console.log(e);
    res.status(500).send("Error Logging in");
  }



}

module.exports = {
  signUp,
  login
}