const express = require('express');
const cors = require('cors');

const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes'); // Assuming you have a mealPlanRoutes.js file
// Import other route modules here

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/meal-plans', mealPlanRoutes); // Assuming you have a mealPlanRoutes.js file
// app.use('/ingredients', ingredientRoutes); etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
