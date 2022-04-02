// checks if the user is logged in

const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenDecoder = (token,res) => {
  try {
    
    let user=jwt.verify(token, process.env.JWT_TOKEN);      
    return user
  } catch (e) {
    return res.status(400).send('Invalid Token!')
  }
}

module.exports = (req, res, next) => {
  // if no token is provided, throw error
  if (!req.headers.authorization) return res.status(400).send('No token provided! Please login')
  //if token is not bearer throw error
  else {
    let temp = req.headers.authorization.trim().split(' ');
    // if token is incorrect throw error
    if (temp[0] != 'Bearer') return res.status(400).send('Not Bearer token')
    // decode the token and pass on the user
    else {
      let user = tokenDecoder(temp[1], res).user;    
      if (user) {        
        console.log('Hi ' + user.name + '👋👋👋')
        req.loggedUser = user;
        // console.log(req.loggedUser)
        next()
      }
    }
  }  
}