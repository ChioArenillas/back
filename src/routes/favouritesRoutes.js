const express = require('express')
const router = express.Router()
const {
  getFavourites,
  isFavourite,
  addFavourite,
  deleteFavourite
} = require('../controllers/FavouriteController')

router.get('/', getFavourites)
router.get('/:donutId', isFavourite)
router.post('/', addFavourite)
router.delete('/:donutId', deleteFavourite)

module.exports = router
