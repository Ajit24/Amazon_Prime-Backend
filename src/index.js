const express = require('express')
const app = express();
const {body,validationResult}=require('express-validator')
const userController=require('./controllers/user.controller')
const watchListController=require('./controllers/watchList.controller')
const {registerController,loginController}=require('./controllers/auth.controller')
app.use(express.json())
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.post('/register',
body('name')
.notEmpty()
.withMessage('Name cannot be empty!'),
body('email')
.isEmail()
    .withMessage('Not  a valid Email!'),
    body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!'), registerController)

app.post('/login',
body('email')
.isEmail()
    .withMessage('Not  a valid Email!'),
    body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!'),
  loginController)


app.use('/users', userController);
app.use('/watchList', watchListController);




module.exports = app;