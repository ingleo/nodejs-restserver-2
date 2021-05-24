const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidators, fileValidator } = require("../middlewares");
const { isValidCollection } = require("../helpers");
const { uploadFile, updateImg } = require("../controllers/uploads");

const router = Router();

router.post("/", fileValidator, uploadFile);

router.put(
  "/:collection/:id",
  [
    fileValidator,
    check("id", "No es un id válido").isMongoId(),
    check("collection").custom((c) =>
      isValidCollection(c, ["users", "products"])
    ),
    fieldsValidators,
  ],
  updateImg
);

module.exports = router;
