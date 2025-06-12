const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getRecipes);
router.get('/category/:category', recipeController.getRecipesByCategory);
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.addRecipe);
router.put('/:id', recipeController.editRecipe);
router.delete('/:id', recipeController.deleteRecipe);

// Add other routes: POST, PUT, DELETE

module.exports = router;