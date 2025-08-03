const Author = require("../models/Author");

const createAuthor = async (req, res) => {
try {
    const newAuthor = new Author(req.body);
    const saved = await newAuthor.save();
    res.status(201).json(saved);
  } catch (err) {
     console.error("Save error:", err);
    res.status(500).json({ message: err.message });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ date: -1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createAuthor, getAllAuthors };
