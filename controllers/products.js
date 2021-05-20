const { Product } = require("../models");

const getProducts = async (req, res) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

const createProduct = async (req, res) => {
  const { name, description, unitPrice, category } = req.body;

  const productDB = await Product.findOne({ name });

  if (productDB) {
    return res.json(400).json({
      msg: `El producto ${productDB.name} ya existe`,
    });
  }

  const data = {
    name: req.body.name.toUpperCase(),
    description,
    unitPrice,
    category,
    user: req.user._id,
  };

  const product = new Product(data);
  await product.save();
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
