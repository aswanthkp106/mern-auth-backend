const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ==========================================
// 1. USER SIGNUP ROUTE
// ==========================================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;

    // Check if the email is already registered in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // Encrypt the plain text password for safe storage
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });

    await newUser.save();
    res.status(201).json("User created");
  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// 2. USER LOGIN ROUTE
// ==========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email record
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    // Compare inputted password with encrypted database password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    // Sends the full user object back (including its unique MongoDB _id)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// 3. CHANGE USERNAME ROUTE
// ==========================================
router.put("/change-username/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username: req.body.username },
      { new: true } // Returns the newly modified document rather than the old one
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// 4. CHANGE PASSWORD ROUTE
// ==========================================
router.put("/change-password/:id", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// 5. CHANGE PROFILE PICTURE ROUTE (The New Addition!)
// ==========================================
router.put("/update-profilepic/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { profilePic: req.body.profilePic }, // Saves incoming Base64 image file string
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// 6. DELETE ACCOUNT ROUTE
// ==========================================
router.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;