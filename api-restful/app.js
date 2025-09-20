const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");
const errorHandler = require("./middleware/errorHandler");
//Middleware
app.use(express.json()); //Para leer json de las solicitudes
app.use(cors()); //Permitir solicitudes de otros dominios
app.use(morgan("dev")) //detalles de cada petición
//rutas bases
app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);
app.use(errorHandler);

//Mensaje de prueba en la raiz
app.get("/", (req,res)=>{
    res.send("Bienvenido a la API RESTful!");
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running at http://locaclhost:${PORT}`)
})