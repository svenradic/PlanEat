const {db} = require("../services/firebaseService"); // your initialized Firestore

exports.saveMealPlan = async (req, res) => {
  try {
    const { userId, mealPlan } = req.body;
    if (!userId || !mealPlan || !mealPlan.weekStart) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const docRef = db.doc(`users/${userId}/meal-plans/${mealPlan.weekStart}`);
    await docRef.set(mealPlan);
    res.status(200).json({ message: "Meal plan saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMealPlans = async (req, res) => {
  try {
    const { userId } = req.params;
    const collectionRef = db.collection(`users/${userId}/meal-plans`);
    const snapshot = await collectionRef.get();

    let plans = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    plans = plans.sort((a, b) => {
      const dateA = new Date(a.weekStart);
      const dateB = new Date(b.weekStart);
      return dateB - dateA;
    });

    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMealPlan = async (req, res) => {
  try {
    const { userId, weekStart } = req.params;
    const docRef = db.doc(`users/${userId}/meal-plans/${weekStart}`);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    res.json({ id: docSnap.id, ...docSnap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const { userId, weekStart } = req.params;
    const updatedData = req.body;

    const docRef = db.doc(`users/${userId}/meal-plans/${weekStart}`);
    await docRef.set(updatedData, { merge: true });

    res.status(200).json({ message: "Meal plan updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
