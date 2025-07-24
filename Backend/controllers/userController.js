const bcrypt = require("bcrypt");
const User = require("../models/user");

// signup controller
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile, dos, remember } = req.body;

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("User model is:", User); //for debugging

    // Create and store user with original email and mobile
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile,
      dos,
      remember,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
};
// login controller
const login = async (req, res) => {
  try { 
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
}

module.exports = { signup, login };