const { Router } = require("express");
const { check } = require("express-validator");

const {
  jwtValidator,
  fieldsValidators,
  isAdminRole,
} = require("../middlewares");

const {
  categoryIdExists,
  productIdExists,
} = require("../helpers/db-validators");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(productIdExists),
    fieldsValidators,
  ],
  getProductById
);

router.post(
  "/",
  [
    jwtValidator,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un id válido").isMongoId(),
    check("category").custom(categoryIdExists),
    fieldsValidators,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    jwtValidator,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(productIdExists),
    fieldsValidators,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    jwtValidator,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(productIdExists),
    fieldsValidators,
  ],
  deleteProduct
);

module.exports = router;
