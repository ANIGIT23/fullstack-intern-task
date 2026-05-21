const express = require('express');
const verifyToken = require('../middleware/auth');
const {
  addFavorite,
  getFavorites,
  getFavoriteIds,
} = require('../controllers/favoriteController');

const router = express.Router();

router.use(verifyToken);

router.get('/', getFavorites);
router.get('/ids', getFavoriteIds);
router.post('/:templateId', addFavorite);

module.exports = router;
