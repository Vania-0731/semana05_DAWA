const { v4: uuidv4 } = require("uuid");
const TicketRepository = require("../repositories/TicketRepository");
const NotificationService = require("./NotificationService");

class TicketService {
  constructor() {
    this.repo = new TicketRepository();
    this.notificationService = new NotificationService();
  }

  createTicket(data) {
    if (!data.title || data.title.trim() === "") {
      throw new Error("El título es requerido");
    }
    
    if (!data.description || data.description.trim() === "") {
      throw new Error("La descripción es requerida");
    }
    
    if (data.title.length < 3) {
      throw new Error("El título debe tener al menos 3 caracteres");
    }
    
    if (data.description.length < 10) {
      throw new Error("La descripción debe tener al menos 10 caracteres");
    }
    
    const validPriorities = ["low", "medium", "high", "urgent"];
    if (data.priority && !validPriorities.includes(data.priority)) {
      throw new Error("La prioridad debe ser: low, medium, high o urgent");
    }

    const ticket = {
      id: uuidv4(),
      title: data.title.trim(),
      description: data.description.trim(),
      status: "nuevo",
      priority: data.priority || "medium",
      assignedUser: null
    };

    this.repo.save(ticket);
    this.notificationService.create("email", `Nuevo ticket creado: ${ticket.title}`, ticket.id);

    return ticket;
  }

  assignTicket(id, user) {
    const ticket = this.repo.update(id, { assignedUser: user });
    if (ticket) {
      this.notificationService.create("email", `El ticket ${ticket.id} fue asignado a ${user}`, ticket.id);
    }
    return ticket;
  }

  changeStatus(id, newStatus) {
    const ticket = this.repo.update(id, { status: newStatus });
    if (ticket) {
      this.notificationService.create("push", `El ticket ${ticket.id} cambió a ${newStatus}`, ticket.id);
    }
    return ticket;
  }

  list() {
    return this.repo.findAll();
  }

  listPaginated(pagina, limite) {
    const todosLosTickets = this.repo.findAll();
    const totalTickets = todosLosTickets.length;
    const totalPaginas = Math.ceil(totalTickets / limite);
    const indiceInicio = (pagina - 1) * limite;
    const indiceFin = indiceInicio + limite;
    const tickets = todosLosTickets.slice(indiceInicio, indiceFin);

    return {
      tickets,
      paginacion: {
        pagina,
        limite,
        totalTickets,
        totalPaginas,
        tieneSiguiente: pagina < totalPaginas,
        tieneAnterior: pagina > 1
      }
    };
  }

  deleteTicket(id) {
    const deleted = this.repo.delete(id);
    if (!deleted) {
      throw new Error("Ticket no encontrado");
    }
    return true;
  }
}

module.exports = TicketService;
