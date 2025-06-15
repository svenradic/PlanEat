const { db } = require("../services/firebaseService");

exports.saveShoppingList = async (req, res) => {
  try {
    const { userId, weekStart, ingredients } = req.body;

    if (!userId || !weekStart || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const savedIngredients = [];

    for (const ingredient of ingredients) {
      const docRef = db
        .collection(`users/${userId}/meal-plans/${weekStart}/shopping-list`)
        .doc(); // auto-generated ID

      await docRef.set(ingredient);
      savedIngredients.push({ id: docRef.id, ...ingredient }); // include ID
    }

    res.status(200).json(savedIngredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateShoppingListItem = async (req, res) => {
  try {
    const { userId, weekStart, ingredientId } = req.params;
    const ingredient = req.body;

    if (!ingredientId || !ingredient) {
      return res.status(400).json({ error: "Missing ingredient data" });
    }

    const docRef = db.doc(
      `users/${userId}/meal-plans/${weekStart}/shopping-list/${ingredientId}`
    );

    await docRef.set(ingredient, { merge: true });

    res.status(200).json({ message: "Ingredient updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShoppingList = async (req, res) => {
  try {
    const { userId, weekStart } = req.params;

    const snapshot = await db
      .collection(`users/${userId}/meal-plans/${weekStart}/shopping-list`)
      .get();

    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
