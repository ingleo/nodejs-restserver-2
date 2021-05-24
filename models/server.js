const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/uploads",
    };

    //BD Connect
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //body parser
    this.app.use(express.json());

    //Public directory
    this.app.use(express.static("public"));

    //Fileupload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  async connectDB() {
    await dbConnection();
  }

  //routes
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log("Servidor ejecuntando en puerto ", this.port);
    });
  }
}

module.exports = Server;
