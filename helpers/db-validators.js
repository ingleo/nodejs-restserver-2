const { Role, User, Category, Product } = require("../models");

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no es permitido`);
  }
};

const emailExists = async (email) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`El email ${email} ya está registrado`);
  }
};

const userIdExists = async (id) => {
  const userId = await User.findById(id);
  if (!userId) {
    throw new Error(`El id ${id} no existe`);
  }
};

const categoryIdExists = async (id) => {
  const categoryId = await Category.findById(id);
  if (!categoryId) {
    throw new Error(`El id ${id} no existe`);
  }
};

const productIdExists = async (id) => {
  const productId = await Product.findById(id);
  if (!productId) {
    throw new Error(`El id ${id} no existe`);
  }
};

const isValidCollection = (collectionName = "", collections = []) => {
  const valid = collections.includes(collectionName);
  if (!valid) {
    throw new Error(`La colección ${collectionName} no es permitida`);
  }

  return true;
};

module.exports = {
  isValidRole,
  emailExists,
  userIdExists,
  categoryIdExists,
  productIdExists,
  isValidCollection
};
