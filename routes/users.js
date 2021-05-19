const { Router } = require("express");
const { check } = require("express-validator");

const {
  fieldsValidators,
  jwtValidator,
  isAdminRole,
  hasRole,
} = require("../middlewares");

const {
  isValidRole,
  emailExists,
  userIdExists,
} = require("../helpers/db-validators");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mínimo 6 letras").isLength({
      min: 6,
    }),
    check("email", "Formato correo no válido").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
  ],
  fieldsValidators,
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(userIdExists),
    check("role").custom(isValidRole),
    fieldsValidators,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    jwtValidator,
    //isAdminRole,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(userIdExists),
    fieldsValidators,
  ],
  deleteUsers
);

module.exports = router;
