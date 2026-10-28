
const { z } = require("zod");

const alumnoSchema = z.object({
    nombre: z.string()
        .trim()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no puede superar 100 caracteres"),

    email: z.string()
        .trim()
        .email("El correo electrónico no es válido")
        .max(254, "El correo no puede superar 254 caracteres")
});

module.exports = alumnoSchema;
