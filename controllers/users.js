const { request, response } = require("express");

const getUsers = (req, res = response) => {
  const params = req.query;
  res.json({
    msg: "get API -ctrl",
    params
  });
};

const postUsers = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "post API -ctrl",
    body,
  });
};

const putUsers = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API -ctrl",
    id,
  });
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: "patch API -ctrl",
    body,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
};
