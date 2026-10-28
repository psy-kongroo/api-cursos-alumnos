
const { z } = require("zod");

const cursoSchema = z.object({
    nombre: z.string()
        .trim()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no puede superar 100 caracteres"),

    descripcion: z.string()
        .trim()
        .min(1, "La descripción es obligatoria")
        .max(300, "La descripción no puede superar 300 caracteres")
});

module.exports = cursoSchema;
