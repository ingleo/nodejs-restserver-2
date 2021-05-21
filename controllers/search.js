const allowedCollections = ["users", "categories", "products"];
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const searchUsers = async (term = "", res) => {
  //verify if is valid mongo id
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.json({
    result: users,
  });
};

const search = (req, res) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    res.status(400).json({
      msg: `Las colecciones permitidas son: ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      break;
    case "products":
      break;
    default:
      res.status(500).json({
        msg: "Busqueda no permitida",
      });
  }
};

module.exports = {
  search,
};
