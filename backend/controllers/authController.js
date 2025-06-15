// controllers/authController.js
const { admin } = require("../services/firebaseService");

// Middleware to verify ID token
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Register a user (create user in Firebase Auth)
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ uid: userRecord.uid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Google login – verify token from frontend
exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Missing token" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const userRecord = await admin.auth().getUser(decoded.uid);

    res.status(200).json({
      token,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
      },
    });
  } catch (err) {
    console.error("Google login failed:", err);
    res.status(401).json({ error: "Invalid Google token" });
  }
};

// Get current user info
exports.getProfile = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.user.uid);
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};