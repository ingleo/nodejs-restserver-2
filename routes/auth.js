const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidators } = require("../middlewares/fields-validators");
const { login } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    fieldsValidators,
  ],
  login
);

module.exports = router;
