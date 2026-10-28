# API de cursos y alumnos

## Descripción

API REST desarrollada con Node.js y Express para gestionar cursos y los alumnos asociados a cada curso.

La API utiliza rutas REST anidadas, validación de datos mediante Zod, manejo centralizado de errores, CORS y un middleware propio de registro de peticiones.

Los datos se almacenan en memoria, por lo que se pierden al reiniciar el servidor.

## Tecnologías

- Node.js
- Express
- Zod
- CORS

## Instalación y ejecución

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Iniciar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

3. La API estará disponible en:

   `http://localhost:3000`

## Recursos

- **Cursos:** `id`, `nombre`, `descripcion`.
- **Alumnos:** `id`, `cursoId`, `nombre`, `email`.

Los alumnos están asociados a un curso mediante `cursoId`.

## Tabla de rutas

| Método | Ruta | Descripción | Códigos esperados |
|---|---|---|---|
| GET | `/` | Comprobar que la API funciona | 200 |
| GET | `/api/cursos` | Listar cursos | 200 |
| GET | `/api/cursos/:id` | Consultar un curso | 200, 404 |
| POST | `/api/cursos` | Crear un curso | 201, 400 |
| PUT | `/api/cursos/:id` | Actualizar un curso | 200, 400, 404 |
| DELETE | `/api/cursos/:id` | Eliminar un curso | 204, 404, 409 |
| GET | `/api/cursos/:cursoId/alumnos` | Listar alumnos de un curso | 200, 404 |
| GET | `/api/cursos/:cursoId/alumnos/:alumnoId` | Consultar un alumno | 200, 404 |
| POST | `/api/cursos/:cursoId/alumnos` | Crear un alumno | 201, 400, 404 |
| PUT | `/api/cursos/:cursoId/alumnos/:alumnoId` | Actualizar un alumno | 200, 400, 404 |
| DELETE | `/api/cursos/:cursoId/alumnos/:alumnoId` | Eliminar un alumno | 204, 404 |

Todas las rutas pueden devolver `404` si la dirección solicitada no existe. Los errores inesperados pueden devolver `500`.

### Códigos de estado

- `200 OK`: petición correcta.
- `201 Created`: recurso creado.
- `204 No Content`: recurso eliminado correctamente, sin cuerpo de respuesta.
- `400 Bad Request`: datos no válidos o JSON incorrecto.
- `404 Not Found`: recurso o ruta no encontrados.
- `409 Conflict`: no se puede eliminar un curso que tiene alumnos.
- `500 Internal Server Error`: error inesperado del servidor.

## Validación

Zod valida el cuerpo de las peticiones `POST` y `PUT`.

- Cursos: `nombre` y `descripcion` son obligatorios.
- Alumnos: `nombre` y `email` son obligatorios, y el correo debe tener un formato válido.

Los errores de validación se gestionan mediante el middleware centralizado.

## Middlewares

- `logger`: registra globalmente el método y la URL de cada petición.
- `manejoErrores`: centraliza el tratamiento de errores HTTP, errores de Zod y errores inesperados.

## CORS

Se permite el origen `http://localhost:4200`, para facilitar la integración con una aplicación Angular en desarrollo.
