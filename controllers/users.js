const { request, response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //password hash
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //store on bd
  await user.save();
  res.json({
    user,
  });
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...payload } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    payload.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, payload);

  res.json({
    user,
  });
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  //physical remove
  //const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
