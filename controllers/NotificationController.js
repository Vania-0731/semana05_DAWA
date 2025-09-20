const NotificationService = require("../services/NotificationService");
const service = new NotificationService();

exports.list = (req, res) => {
  res.status(200).json(service.list());
};

exports.getByTicketId = (req, res, next) => {
  const { id } = req.params;
  const notificaciones = service.getByTicketId(id);
  
  if (notificaciones === null) {
    const error = new Error("Ticket no encontrado");
    error.status = 404;
    return next(error);
  }
  
  res.status(200).json({
    idTicket: id,
    notificaciones,
    total: notificaciones.length
  });
};

