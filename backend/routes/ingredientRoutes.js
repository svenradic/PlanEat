const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController.js');


router.post('/', ingredientController.addIngredient);


// Add other routes: POST, PUT, DELETE

module.exports = router;