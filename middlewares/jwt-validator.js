const jwt = require("jsonwebtoken");

const User = require("../models/user");

const jwtValidator = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Usuario no autorizado",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    //read user by uid
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'El usuario no existe'
      })
    }

    //verify if uid status is true
    if (!user.status) {
      return res.status(401).json({
        msg: 'Token no válido'
      })
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  jwtValidator,
};
