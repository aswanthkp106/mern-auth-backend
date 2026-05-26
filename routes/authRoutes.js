const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// SIGNUP
router.post("/signup", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json("User created");

  } catch(err){
    res.status(500).json(err);
  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json("User not found");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if(!validPassword){
      return res.status(400).json("Wrong password");
    }

    res.status(200).json(user);

  } catch(err){
    res.status(500).json(err);
  }

});


// CHANGE USERNAME
router.put("/change-username/:id", async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username
      },
      { new: true }
    );

    res.status(200).json(updatedUser);

  } catch(err){
    res.status(500).json(err);
  }

});


// DELETE ACCOUNT
router.delete("/delete-user/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User deleted");

  } catch(err){
    res.status(500).json(err);
  }

});
// CHANGE PASSWORD
router.put("/change-password/:id", async (req, res) => {

  try {

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        password: hashedPassword
      },
      { new: true }
    );

    res.status(200).json(updatedUser);

  } catch(err) {

    res.status(500).json(err);

  }

});
// CHANGE PASSWORD
router.put("/change-password/:id", async (req, res) => {

  try {

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        password: hashedPassword
      },
      { new: true }
    );

    res.status(200).json(updatedUser);

  } catch(err) {

    res.status(500).json(err);

  }

});
module.exports = router;