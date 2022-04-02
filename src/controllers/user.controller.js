const User = require('../models/user.model')
const router = require('express').Router();
const { body, validationResult } = require('express-validator')
const authenticate=require('../middlewares/authenticate')
// const authorise=require('../middlewares/authorise')

router.get('', authenticate, async(req, res) => {
  try {
    const users = await User.find();
    res.status(201).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})



module.exports = router;