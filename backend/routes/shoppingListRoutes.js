const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.post('/', shoppingListController.saveShoppingList);
router.put('/:userId/:weekStart/:ingredientId', shoppingListController.updateShoppingListItem);
router.get('/:userId/:weekStart', shoppingListController.getShoppingList);

// Add other routes: POST, PUT, DELETE

module.exports = router;