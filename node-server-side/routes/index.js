var express = require('express');
var router = express.Router();
const searchController = require('../controllers/searchController');
const productsController = require('../controllers/productsController');


/* GET home page. */
router.get('/api/items', searchController.seeker)
router.get('/api/items/:id', productsController.description)

module.exports = router

//https://api.mercadolibre.com/sites/MLA/search?q=iphone

