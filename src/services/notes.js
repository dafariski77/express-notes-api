const Note = require("../models/Note");

const getNoteByAuthor = async (req) => {
  const { author } = req.params;

  const result = await Note.find({ author });

  return result;
};

const getOneNote = async (req, res) => {
  const { id } = req.params;

  const result = await Note.findById(id);

  if (!result) return res.status(404).json({ message: "Note not found" });

  return result;
};

const createNote = async (req) => {
  const { title, note, author } = req.body;

  const result = await Note.create({
    title,
    note,
    author,
  });

  return result;
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, note } = req.body;

  const check = await Note.findOne({
    _id: id,
  });

  if (!check) return res.status(404).json({ message: "Note not found" });

  const result = await Note.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      note,
    },
    { new: true, runValidators: true }
  );

  if (!result) return res.status(404).json({ message: "Note not found" });

  return result;
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  const result = await Note.findOne({
    _id: id,
  });

  if (!result) return res.status(404).json({ message: "Note not found" });

  await result.remove();

  return result;
};

module.exports = {
  getNoteByAuthor,
  createNote,
  getOneNote,
  updateNote,
  deleteNote,
};
