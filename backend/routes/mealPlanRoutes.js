const express = require("express");
const router = express.Router();
const mealPlanController = require("../controllers/mealPlanController.js");

router.post("/", mealPlanController.saveMealPlan); // expects { userId, mealPlan }
router.get("/:userId", mealPlanController.getAllMealPlans);
router.get("/:userId/:weekStart", mealPlanController.getMealPlan);
router.put("/:userId/:weekStart", mealPlanController.updateMealPlan);

// Add other routes: POST, PUT, DELETE

module.exports = router;
