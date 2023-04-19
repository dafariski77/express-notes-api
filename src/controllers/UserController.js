const { userLogin, userRegister } = require("../services/users");

const login = async (req, res, next) => {
  try {
    const result = await userLogin(req, res);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await userRegister(req, res);

    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
