const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidators } = require("../middlewares/fields-validators");
const { login, googleSignIn } = require("../controllers/auth");

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

router.post(
  "/google",
  [
    check("id_token", "El token es obligatorio").not().isEmpty(),
    fieldsValidators,
  ],
  googleSignIn
);

module.exports = router;
