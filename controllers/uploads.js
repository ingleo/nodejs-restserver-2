const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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

const updateImgCloudinary = async (req, res) => {
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
    const fileNamePath = model.img.split("/");
    const fileName = fileNamePath[fileNamePath.length - 1];
    const [public_id] = fileName.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  res.json(model);
};

const getimg = async (req, res) => {
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
      return res.sendFile(imgPath);
    }
  }

  const noImagePath = path.join(__dirname, "../assets", "no-image.jpg");
  res.sendFile(noImagePath);
};

module.exports = {
  uploadFile,
  updateImg,
  getimg,
  updateImgCloudinary,
};
