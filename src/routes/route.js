const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Note = require("../models/Note.js");
const User = require("../models/User.js");

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const checker = async (username, password) => {
      const userData = await User.findOne({ username: username });
      const compare = () => {
        if (password === userData.password) {
          return true;
        } else {
          false;
        }
      };
      return {
        compare: compare(),
        userData,
      };
    };
    const check = await checker(username, password);
    if (check.compare === true) {
      res.status(200).json({
        users: check.userData,
        success: true,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "invalid username or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "data invalid",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const dataUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });

    User.findOne({
      username: req.body.username,
    }).exec(async (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (user) {
        res.status(400).json({
          message: "Username already exist!",
        });
        return;
      } else {
        const insertedUser = await dataUser.save();
        res.status(200).json({
          insertedUser,
          message: "User added!",
        });
        return;
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Data invalid",
    });
  }
});

// Note Route
router.get("/:author", async (req, res) => {
  try {
    const notes = await Note.find({ author: req.params.author });
    res.json({ notes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const note = new Note(req.body);
  try {
    const insertedNote = await note.save();
    res.status(201).json(insertedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updateNote = await Note.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json(updateNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
