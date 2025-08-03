// console.log("Server.js loaded");  //debugging

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const cors = require("cors");


const app = express();


// Session middleware
app.use(
  session({
    secret: "keyboard cat", //
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    // Redirect to frontend with optional user info (token, etc.)
    res.redirect("http://localhost:3000/dashboard");
  }
);


// Success and failure routes
app.get("/auth/success", (req, res) => {
  res.send("Google Login Successful");
});

app.get("/auth/failure", (req, res) => {
  res.send("Google Login Failed");
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authorRoutes = require("./routes/authorRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/authors", authorRoutes);
app.use("/api/users", userRoutes);

// MongoDB Conn.
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(" MongoDB connection error:", err));
