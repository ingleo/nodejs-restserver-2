const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

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
  }

  //routes
  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log("Servidor ejecuntando en puerto ", this.port);
    });
  }
}

module.exports = Server;
