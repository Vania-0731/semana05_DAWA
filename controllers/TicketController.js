const TicketService = require("../services/TicketService");
const service = new TicketService();

exports.create = (req, res, next) => {
  try {
    const ticket = service.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    if (error.message.includes("requerido")) {
      error.status = 400;
    } else if (error.message.includes("debe tener")) {
      error.status = 400;
    } else if (error.message.includes("prioridad")) {
      error.status = 400;
    } else {
      error.status = 500;
    }
    next(error);
  }
};

exports.list = (req, res) => {
  const pagina = parseInt(req.query.page) || 1;
  const limite = parseInt(req.query.limit) || 10;
  const resultado = service.listPaginated(pagina, limite);
  res.status(200).json(resultado);
};

exports.assign = (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);
  if (!ticket) {
    const error = new Error("Ticket no encontrado");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(ticket);
};

exports.changeStatus = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);
  if (!ticket) {
    const error = new Error("Ticket no encontrado");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(ticket);
};

exports.delete = (req, res, next) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (error) {
    error.status = 404;
    next(error);
  }
}

