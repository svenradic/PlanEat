const express = require('express');
const cors = require('cors');

const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes'); 
const shoppingListRoutes = require('./routes/shoppingListRoutes'); 
const authRoutes = require('./routes/authRoutes'); // Import auth routes if needed
// Import other route modules here

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/meal-plans', mealPlanRoutes);
app.use('/shopping-list', shoppingListRoutes);
app.use('/auth', authRoutes);
// app.use('/ingredients', ingredientRoutes); etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
