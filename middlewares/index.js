const fieldValidators = require("../middlewares/fields-validators");
const jwtValidator = require("../middlewares/jwt-validator");
const roleValidator = require("../middlewares/role-validator");
const fileValidator = require("../middlewares/file-validator");

module.exports = {
  ...fieldValidators,
  ...jwtValidator,
  ...roleValidator,
  ...fileValidator,
};
