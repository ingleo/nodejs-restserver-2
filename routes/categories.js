const { Router } = require("express");
const { check } = require("express-validator");

const {
  fieldsValidators,
  isAdminRole,
  jwtValidator,
} = require("../middlewares");

const { categoryIdExists } = require("../helpers/db-validators");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoryIdExists),
    fieldsValidators,
  ],
  getCategoryById
);

router.post(
  "/",
  [
    jwtValidator,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    fieldsValidators,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    jwtValidator,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoryIdExists),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    fieldsValidators,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [
    jwtValidator,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoryIdExists),
    fieldsValidators,
  ],
  deleteCategory
);

module.exports = router;
