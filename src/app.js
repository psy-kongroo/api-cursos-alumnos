
const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const manejoErrores = require("./middlewares/manejoErrores");
const ErrorHTTP = require("./utils/ErrorHTTP");

const cursosRouter = require("./routes/cursos");
const alumnosRouter = require("./routes/alumnos");

const app = express();
const PORT = 3000;

// 1. Configurar CORS
app.use(cors({
    origin: "http://localhost:4200"
}));

// 2. Permitir recibir JSON
app.use(express.json());

// 3. Middleware propio global
app.use(logger);

// 4. Ruta de bienvenida
app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API de cursos y alumnos funcionando"
    });
});

// 5. Registrar los routers
app.use("/api/cursos", cursosRouter);
app.use("/api/cursos", alumnosRouter);

// 6. Ruta no encontrada
app.use((req, res, next) => {
    next(new ErrorHTTP("La ruta solicitada no existe", 404));
});

// 7. Middleware centralizado de errores
app.use(manejoErrores);

// 8. Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
