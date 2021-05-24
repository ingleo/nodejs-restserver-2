const path = require("path");
const fs = require("fs");

const { fileUpload } = require("../helpers/file-upload");

const { User, Product } = require("../models");

const uploadFile = async (req, res) => {
  try {
    const name = await fileUpload(req.files, undefined, "textos");
    res.json({
      name,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

const updateImg = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con id ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con id ${id}`,
        });
      }
      break;
    default:
      return res.status(400).json({ msg: "La colección es inválida" });
  }

  if (model.img) {
    const imgPath = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  const fileName = await fileUpload(req.files, undefined, collection);
  model.img = fileName;

  await model.save();

  res.json(model);
};

module.exports = {
  uploadFile,
  updateImg,
};
