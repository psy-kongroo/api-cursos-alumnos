
const express = require("express");
const router = express.Router();

const { cursos, alumnos } = require("../data/datos");
const ErrorHTTP = require("../utils/ErrorHTTP");
const cursoSchema = require("../schemas/cursoSchema");

// GET /api/cursos

router.get("/", (req, res) => {
    res.status(200).json(cursos);
});

//GET /api/cursos/:id

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const curso = cursos.find(c => c.id === id); //buscamos el curso correspondiente

    if (!curso) {
        throw new ErrorHTTP("Curso no encontrado", 404);
    } //si no lo encontramos, lanzamos ErrorHTTP

    res.status("200").json(curso); //si lo hacemos, lo mostramos
});

//POST /api/cursos

router.post("/", (req, res) => {
    const datosValidados = cursoSchema.parse(req.Body);

    //aquí están los datos que envía el cliente en el cuerpo de la petición
    //.parse comprueba que los datos cumplen esas reglas

    const nuevoCurso = {

        //si el array cursos contiene algún curso, buscamos el ID más alto y le sumamos uno
        //si está vacío, el primer ID será 1
        id: cursos.length > 0
        ? Math.max(...cursos.map(c => c.id)) + 1 //map() recorre el array y genera otro con el resultado de aplicar una operación a cada elemento
        : 1,
        ...datosValidados //se usa ... para copiar las propiedades de un objeto dentro de otro, en este caso el body
        
        //... es un "spread", los tres "." permiten pasar los elementos del array como args individuales
    };
    cursos.push(nuevoCurso);

    res.status(201).json(nuevoCurso); //.json(nuevoCurso) convierte el objeto en respuesta JSON y la envía al cliente

});

//PUT /api/cursos/:id

router.put("/:id", (req, res) => {

    //Obtenemos el ID de la URL y lo convertimos a número
    const id = Number(req.params.id);

    //Buscamos dentro del array "cursos" el curso que tenga ese id
    const curso = cursos.find(c => c.id === id);

    //comprobamos si existe
    if (!curso) {
        throw new ErrorHTTP("Curso no encontrado", 404);
    }

    //validamos los datos recibidos en el cuerpo de la petición
    //utilizando el esquema de Zod "cursoSchema"
    const datosValidados = cursoSchema.parse(req.body);

    //actualizamos el nombre del curso con el dato validado
    curso.nombre = datosValidados.nombre;

    //lo mismo con la descripción
    curso.descripcion = datosValidados.descripcion;

    res.status(200).json(curso);
});

// DELETE /api/cursos/:id
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);


    //buscamos la posición del curso dentro del array  
    const indice = cursos.findIndex(c => c.id === id);

    //si no existe, findIndex devuelve -1
    if (indice === -1) {
        throw new ErrorHTTP("Curso no encontrado", 404);
    }

    //comprobamos si hay ALGÚN alumno asociado a este curso
    const tieneAlumnos = alumnos.some(a => a.cursoId === id);

    if (tieneAlumnos) {
        throw new ErrorHTTP(
            "No se puede eliminar un curso que tiene alumnos",
            409
        );
    }

    cursos.splice(indice, 1); //eliminamos el elemento del array, empezando por la posición que hallamos antes

    res.status(204).end(); //se indica el estado 204 y no se envía contenido
});

module.exports = router;