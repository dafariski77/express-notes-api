const express = require("express");
const { login, register } = require("../controllers/UserController.js");
const {
  create,
  index,
  update,
  destroy,
  findOne,
} = require("../controllers/NoteController.js");

const router = express.Router();

// Login Route
router.post("/login", login);
router.post("/register", register);

// Note Route
router.get("/notes/:author", index);
router.get("/notes/details/:id", findOne);
router.post("/notes", create);
router.put("/notes/:id", update);
router.delete("/notes/:id", destroy);

module.exports = router;
