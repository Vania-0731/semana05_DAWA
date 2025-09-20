# Sistema de Gestión de Tickets - API RESTful

Una API RESTful desarrollada en Node.js para la gestión de tickets de soporte técnico con sistema de notificaciones integrado.

## 📋 Descripción

Este proyecto implementa un sistema completo de gestión de tickets que permite crear, asignar, modificar el estado y eliminar tickets de soporte. Incluye un sistema de notificaciones automáticas que se activa cuando ocurren cambios en los tickets.

## 🚀 Características

- **Gestión de Tickets**: Crear, listar, asignar, cambiar estado y eliminar tickets
- **Sistema de Notificaciones**: Notificaciones automáticas por email y push
- **Paginación**: Listado paginado de tickets para mejor rendimiento
- **Validaciones**: Validación de datos de entrada con mensajes de error descriptivos
- **Arquitectura Limpia**: Separación de responsabilidades con capas de controladores, servicios y repositorios
- **Manejo de Errores**: Middleware centralizado para el manejo de errores

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **UUID** - Generación de identificadores únicos
- **Morgan** - Logger de peticiones HTTP
- **CORS** - Configuración de políticas de origen cruzado
- **Nodemailer** - Envío de notificaciones por email

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd semana05_DAWA/api-restful
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional)**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   PORT=3000
   ```

4. **Iniciar el servidor**
   ```bash
   # Modo desarrollo (con nodemon)
   npm run dev
   
   # Modo producción
   npm start
   ```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

### Endpoints de Tickets

#### 1. Crear Ticket
```http
POST /tickets
Content-Type: application/json

{
  "title": "Título del ticket",
  "description": "Descripción detallada del problema",
  "priority": "high" // opcional: low, medium, high, urgent
}
```

**Respuesta exitosa (201):**
```json
{
  "id": "uuid-generado",
  "title": "Título del ticket",
  "description": "Descripción detallada del problema",
  "status": "nuevo",
  "priority": "high",
  "assignedUser": null
}
```

#### 2. Listar Tickets (con paginación)
```http
GET /tickets?page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "tickets": [...],
  "paginacion": {
    "pagina": 1,
    "limite": 10,
    "totalTickets": 25,
    "totalPaginas": 3,
    "tieneSiguiente": true,
    "tieneAnterior": false
  }
}
```

#### 3. Asignar Ticket
```http
PUT /tickets/{id}/assign
Content-Type: application/json

{
  "user": "nombre-del-usuario"
}
```

#### 4. Cambiar Estado del Ticket
```http
PUT /tickets/{id}/status
Content-Type: application/json

{
  "status": "en_progreso"
}
```

#### 5. Eliminar Ticket
```http
DELETE /tickets/{id}
```

### Endpoints de Notificaciones

#### 1. Listar Todas las Notificaciones
```http
GET /notifications
```

#### 2. Obtener Notificaciones por Ticket
```http
GET /tickets/{id}/notifications
```

**Respuesta exitosa (200):**
```json
{
  "idTicket": "uuid-del-ticket",
  "notificaciones": [...],
  "total": 5
}
```

## 🔧 Estructura del Proyecto

```
api-restful/
├── controllers/          # Controladores de la API
│   ├── TicketController.js
│   └── NotificationController.js
├── services/            # Lógica de negocio
│   ├── TicketService.js
│   └── NotificationService.js
├── repositories/        # Acceso a datos
│   ├── BaseRepository.js
│   ├── TicketRepository.js
│   └── NotificationRepository.js
├── routes/              # Definición de rutas
│   ├── ticket.routes.js
│   └── notification.routes.js
├── middleware/          # Middlewares personalizados
│   └── errorHandler.js
├── database/            # Base de datos JSON
│   └── db.json
├── app.js              # Punto de entrada de la aplicación
└── package.json        # Configuración del proyecto
```

## 🧪 Pruebas con Postman/Thunder Client

### Colección de Pruebas

1. **Crear un nuevo ticket**
   - Método: `POST`
   - URL: `http://localhost:3000/tickets`
   - Body (JSON):
     ```json
     {
       "title": "Error en el login",
       "description": "Los usuarios no pueden iniciar sesión correctamente",
       "priority": "high"
     }
     ```

2. **Listar tickets con paginación**
   - Método: `GET`
   - URL: `http://localhost:3000/tickets?page=1&limit=5`

3. **Asignar ticket**
   - Método: `PUT`
   - URL: `http://localhost:3000/tickets/{ticket-id}/assign`
   - Body (JSON):
     ```json
     {
       "user": "Juan Pérez"
     }
     ```

4. **Cambiar estado del ticket**
   - Método: `PUT`
   - URL: `http://localhost:3000/tickets/{ticket-id}/status`
   - Body (JSON):
     ```json
     {
       "status": "en_progreso"
     }
     ```

5. **Ver notificaciones de un ticket**
   - Método: `GET`
   - URL: `http://localhost:3000/tickets/{ticket-id}/notifications`

## ⚙️ Configuración Avanzada

### Estados de Tickets Válidos
- `nuevo` - Ticket recién creado
- `asignado` - Ticket asignado a un usuario
- `en_progreso` - Ticket siendo trabajado
- `resuelto` - Ticket completado
- `cerrado` - Ticket finalizado

### Prioridades Válidas
- `low` - Baja prioridad
- `medium` - Prioridad media (por defecto)
- `high` - Alta prioridad
- `urgent` - Prioridad urgente

### Tipos de Notificaciones
- `email` - Notificación por correo electrónico
- `push` - Notificación push

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Cambiar el puerto en app.js o matar el proceso
# En Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error de validación
- Verificar que el título tenga al menos 3 caracteres
- Verificar que la descripción tenga al menos 10 caracteres
- Usar prioridades válidas: low, medium, high, urgent

## 📝 Notas de Desarrollo

- El sistema utiliza un archivo JSON como base de datos para simplicidad
- Las notificaciones se crean automáticamente al realizar acciones en los tickets
- El sistema incluye validaciones robustas para prevenir datos inválidos
- La paginación mejora el rendimiento con grandes volúmenes de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

**Desarrollado con ❤️ para el curso de Desarrollo de Aplicaciones Web Avanzadas**
