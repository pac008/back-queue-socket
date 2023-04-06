const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require('cors');
const Sockets = require("./sockets");

class Server {
  // server de express
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // httpServer
    this.server = http.createServer(this.app);
    // config sockets

    // Configuracion de cocket server
    this.io = socketio(this.server, {
      /**Configs */
    });
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors())

    this.app.get('/api/last-thirteen', (req, res) => {
      res.status(200).json({
        ok: true,
        lastThirteen: this.sockets.ticketList.lastThirteen
      });
    })
  }

  // socketsConfiguration() {
  //   new Sockets(this.io);
  // }

  execute() {
    this.middlewares();
    // this.socketsConfiguration();
    this.server.listen(this.port, () => {
      console.log("server corriendo en el puerto: 8080");
    });
  }
}

module.exports = Server;
