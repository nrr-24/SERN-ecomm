const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


exports.register = async (req, res) => {
  try {
    // Validate input
    const { name, email, password, phoneNumber, address } = req.body;
    if (!name || !email || !password || !phoneNumber || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check in Admin table
      let user = await Admin.findOne({ where: { Email: email } });
      if (user) {
          console.log("Admin found:", user);

          const isPasswordMatch = await bcrypt.compare(password, user.Password);
          console.log("Password Match (Admin):", isPasswordMatch);

          if (!isPasswordMatch) {
              return res.status(401).json({ message: "Invalid email or password" });
          }

          const token = jwt.sign({ id: user.AdminID, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
          return res.status(200).json({ message: "Login successful", token, isAdmin: true });
      }

      // Check in User table
      user = await User.findOne({ where: { email } });
      if (user) {
          console.log("User found:", user);

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          console.log("Password Match (User):", isPasswordMatch);

          if (!isPasswordMatch) {
              return res.status(401).json({ message: "Invalid email or password" });
          }

          const token = jwt.sign({ id: user.userId, isAdmin: false }, process.env.JWT_SECRET, { expiresIn: "1h" });
          return res.status(200).json({ message: "Login successful", token, isAdmin: false });
      }

      return res.status(404).json({ message: "User not found" });
  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error", error });
  }
};



exports.logout = async (req, res) => {
  try {
    // Assuming token is invalidated on the client side
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.authenticate = async (req, res) => {
  try {
    // Extract token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    res.status(200).json({ message: "Authenticated", user: req.user });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
