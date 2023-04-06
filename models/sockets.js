const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      socket.on("request-ticket", (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });
      socket.on("assign-ticket", ({ agent, desktop }, callback) => {
        const ticketAssigned = this.ticketList.assignTicket(agent, desktop);
        callback(ticketAssigned);
        this.io.emit("ticket-assigned", this.ticketList.lastThirteen);
      });
    });
  }
}

module.exports = Sockets;
