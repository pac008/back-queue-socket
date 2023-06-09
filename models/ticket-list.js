const { v4: uuidv4 } = require("uuid");

const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pending = [];
    this.assigned = [];
  }

  get nextNumber() {
    return this.lastNumber++
  }

  get lastThirteen() {
    return this.assigned.slice(0,13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  assignTicket(agent, desktop) {
    if (this.pending.length === 0) {
      return null;
    }
    const nextTicket = this.pending.shift();
    nextTicket.agent = agent;
    nextTicket.desktop = desktop;
    this.assigned.unshift(nextTicket);
    return nextTicket;
  }
}

module.exports = TicketList;
