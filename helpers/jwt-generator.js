const jwt = require("jsonwebtoken");

const getJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1hr" },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No fue posible generar jwt");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  getJWT,
};
