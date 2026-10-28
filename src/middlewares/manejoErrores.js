const ErrorHTTP = require("../utils/ErrorHTTP");
const {ZodError} = require("zod");

function manejoErrores(err, req, res, next){
    if (res.headersSent){
        return next(err);
    }

//PRIMER CASO: error de validación de Zod.

    if (err instanceof ZodError){
        return res.status(400).json({
            error: "Datos no válidos",
            detalles: err.issues.map(issue => ({ //convierte la ruta del campo en un texto
                campo: issue.path.join("."), //["usuario", "email"] pasa a "usuario.email"
                mensaje: issue.message
            }))
        });
    }

//SEGUNDO CASO: error creado por nosotros con ErrorHTTP.

    if (err instanceof ErrorHTTP){
        return res.status(err.estado).json({
            error: err.message
        });
    }

//TERCER CASO: el cliente ha enviado un JSON mal formado.

    if (err.status === 400 && err.type === "entity.parse.failed"){
        return res.status(400).json({
            error: "El cuerpo de la petición contienen JSON no válido"
        });
    }

//CUARTO CASO: cualquier error que no hayamos reconocido.

    console.error(err); //se registra en la terminal

    return res.status(500).json({
        error: "Error interno del servidor"
    });
}

module.exports = manejoErrores;

/*
 * Este es el middleware centralizado de errores.
 *
 * Express lo reconoce como middleware de errores porque recibe
 * 4 parámetros: err, req, res y next.
 *
 * err: el error que se ha producido.
 * req: información de la petición recibida.
 * res: objeto con el que enviamos la respuesta.
 * next: permite continuar con el siguiente middleware de error.
 */