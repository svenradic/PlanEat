const {db} = require("../services/firebaseService");

exports.addIngredient = async (req, res) => {
  try {
    const ingredient = req.body;

    if (!ingredient || !ingredient.id) {
      return res.status(400).json({ error: "Ingredient must have an id" });
    }

    const docRef = db.collection("ingredients").doc(ingredient.id);
    await docRef.set({ ...ingredient }); // Overwrites or creates the document

    res
      .status(200)
      .json({ message: "Ingredient saved successfully", id: ingredient.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
