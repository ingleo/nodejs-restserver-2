const fieldValidators = require("../middlewares/fields-validators");
const jwtValidator = require("../middlewares/jwt-validator");
const roleValidator = require("../middlewares/role-validator");

module.exports = {
  ...fieldValidators,
  ...jwtValidator,
  ...roleValidator,
};
