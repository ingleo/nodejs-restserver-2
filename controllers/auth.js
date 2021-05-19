const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { getJWT } = require("../helpers/jwt-generator");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //verify if emails exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "El usuario o contraseña no son correctos",
      });
    }

    //verify is user has true status
    if (!user.status) {
      return res.status(401).json({
        msg: "Usuario no está autorizado para ingresar",
      });
    }

    //verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Usuario y/o contraseña incorrectos",
      });
    }

    //generates jwt
    const token = await getJWT(user.id);

    res.json({
      user,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ha ocurrido un error",
    });
  }
};

module.exports = {
  login,
};
