const path = require("path");
const { v4: uuidv4 } = require("uuid");

const defaultValidExt = ["png", "jpg", "jpeg", "gif"];

const fileUpload = (files, validExtensions = defaultValidExt, folder = "") => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split(".");
    const extension = splitName[splitName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(`La extensión de archivo ${extension} no es permitida`);
    }

    const tempfileName = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      tempfileName
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(tempfileName);
    });
  });
};

module.exports = {
  fileUpload,
};
