const {body,validationResult}=require('express-validator')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const User = require('../models/user.model')

const tokenGenerator = (user) => {
  return jwt.sign({user}, process.env.JWT_TOKEN);  
}
// const tokenDecoder = (token) => {
//   return jwt.verify(token, process.env.JWT_TOKEN);      
// }
const registerController = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).send(errors.array())
  }
  //if email is already present, throw error
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).send("Email is already registered!");      
    }
    //if email is not present, hash the password and store in db (using pre hook)
    user=await User.create(req.body)
    //generate a token and return to frontend
    let token=tokenGenerator(user)
    return res.status(201).send({user,token})    
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}
const loginController = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).send(errors.array())
  }

  try {

    //if email is not present, throw invalid email or password
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).send("Invalid email or password!");      
    }
    // if not matching throw invalid email or password
    if (user.checkPass(req.body.password)) {
      //generate a token and return to frontend
      let token = tokenGenerator(user)
      //decoding the user from the token
      
      // return res.status(201).send({decodedUser:tokenDecoder(token)})   
      return res.status(201).send({user,token})   
      
    } else {
      return res.status(500).send("Invalid email or password!");           
    }
    
    
  } catch (e) {    
    console.log(e)
    res.status(500).send(e)
  }
    
}

module.exports={registerController,loginController}