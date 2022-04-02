const Movies = require('../models/watchList.model')
const router = require('express').Router();
const authenticate=require('../middlewares/authenticate')

//get all the movies in watchList
router.get('',authenticate,async (req, res) => {
  try {
    let movies = 0;
    movies = await Movies.find();
    res.status(201).send(movies)

  } catch (e) {
    res.status(500).send(e)
  }
})

//create a new watchList entry
router.post('', authenticate,async (req, res) => {
  try {
    const movie = await Movies.create(req.body);
    res.status(201).send(movie)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router;