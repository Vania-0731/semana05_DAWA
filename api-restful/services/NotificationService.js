const { v4: uuidv4 } = require("uuid");
const NotificationRepository = require("../repositories/NotificationRepository");

class NotificationService {
  constructor() {
    this.repo = new NotificationRepository();
  }

  create(tipo, mensaje, idTicket) {
    const notificacion = {
      id: uuidv4(),
      type: tipo,
      message: mensaje,
      status: "pending",
      ticketId: idTicket
    };
    return this.repo.save(notificacion);
  }

  list() {
    return this.repo.findAll();
  }

  getByTicketId(idTicket) {
    const TicketRepository = require("../repositories/TicketRepository");
    const repositorioTickets = new TicketRepository();
    const ticket = repositorioTickets.findById(idTicket);
    if (!ticket) {
      return null;
    }
    const todasLasNotificaciones = this.repo.findAll();
    return todasLasNotificaciones.filter(notificacion => notificacion.ticketId === idTicket);
  }
}
module.exports = NotificationService;


