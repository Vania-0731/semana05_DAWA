
function errorHandler(err, req, res, next) {
  console.error("MANEJADOR DE ERRORES", err);
  
  const estado = err.status || 500;
  const mensaje = err.message || "Error interno del servidor";
  
  res.status(estado).json({ 
    error: mensaje
  });
}

module.exports = errorHandler;
