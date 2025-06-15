const {db} = require("../services/firebaseService");

exports.getRecipes = async (req, res) => {
  try {
    const snapshot = await db
      .collection("recipes")
      .where("deleted", "==", false)
      .get();
    const recipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = db.collection("recipes").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const data = docSnap.data();

    if (data.deleted) {
      return res.status(404).json({ message: "Recipe is deleted" });
    }

    res.json({ id: docSnap.id, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    console.log("Adding recipe:", recipe);
    // Ensure category is lowercase
    recipe.category = recipe.category.toLowerCase();

    // Add 'deleted' flag
    const recipeWithDeletedFlag = {
      ...recipe,
      deleted: false,
    };

    const docRef = await db.collection("recipes").add(recipeWithDeletedFlag);

    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecipesByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase(); // assuming URL param

    const snapshot = await db
      .collection("recipes")
      .where("category", "==", category)
      .where("deleted", "==", false)
      .get();

    const recipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updatedRecipe = req.body;

    const docRef = db.collection('recipes').doc(recipeId);
    await docRef.update(updatedRecipe);

    res.status(200).json({ message: 'Recipe updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const docRef = db.collection('recipes').doc(recipeId);
    await docRef.update({ deleted: true });

    res.status(200).json({ message: 'Recipe marked as deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


