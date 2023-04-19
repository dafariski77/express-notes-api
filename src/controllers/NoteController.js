const {
  getNoteByAuthor,
  createNote,
  getOneNote,
  updateNote,
  deleteNote,
} = require("../services/notes");

const index = async (req, res, next) => {
  try {
    const result = await getNoteByAuthor(req);

    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res) => {
  try {
    const result = await getOneNote(req, res);

    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const result = await createNote(req);

    return res.status(201).json({
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const result = await updateNote(req, res);

    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const result = await deleteNote(req, res);

    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy,
};
