
const express = require("express");
const router = express.Router();

const { cursos, alumnos } = require("../data/datos");
const ErrorHTTP = require("../utils/ErrorHTTP");
const alumnoSchema = require("../schemas/alumnoSchema");

// Comprueba que el curso existe
function buscarCurso(id) {
    const curso = cursos.find(c => c.id === Number(id));

    if (!curso) {
        throw new ErrorHTTP("Curso no encontrado", 404);
    }

    return curso;
}

// GET /api/cursos/:cursoId/alumnos
router.get("/:cursoId/alumnos", (req, res) => {
    buscarCurso(req.params.cursoId);

    const alumnosDelCurso = alumnos.filter(
        a => a.cursoId === Number(req.params.cursoId)
    );

    res.status(200).json(alumnosDelCurso);
});

// GET /api/cursos/:cursoId/alumnos/:alumnoId
router.get("/:cursoId/alumnos/:alumnoId", (req, res) => {
    buscarCurso(req.params.cursoId);

    const alumno = alumnos.find(
        a => a.id === Number(req.params.alumnoId) &&
             a.cursoId === Number(req.params.cursoId)
    );

    if (!alumno) {
        throw new ErrorHTTP("Alumno no encontrado", 404);
    }

    res.status(200).json(alumno);
});

// POST /api/cursos/:cursoId/alumnos
router.post("/:cursoId/alumnos", (req, res) => {
    const curso = buscarCurso(req.params.cursoId);

    const datosValidados = alumnoSchema.parse(req.body);

    const nuevoAlumno = {
        id: alumnos.length > 0
            ? Math.max(...alumnos.map(a => a.id)) + 1
            : 1,
        cursoId: curso.id,
        ...datosValidados
    };

    alumnos.push(nuevoAlumno);

    res.status(201).json(nuevoAlumno);
});

// PUT /api/cursos/:cursoId/alumnos/:alumnoId
router.put("/:cursoId/alumnos/:alumnoId", (req, res) => {
    buscarCurso(req.params.cursoId);

    const alumno = alumnos.find(
        a => a.id === Number(req.params.alumnoId) &&
             a.cursoId === Number(req.params.cursoId)
    );

    if (!alumno) {
        throw new ErrorHTTP("Alumno no encontrado", 404);
    }

    const datosValidados = alumnoSchema.parse(req.body);

    alumno.nombre = datosValidados.nombre;
    alumno.email = datosValidados.email;

    res.status(200).json(alumno);
});

// DELETE /api/cursos/:cursoId/alumnos/:alumnoId
router.delete("/:cursoId/alumnos/:alumnoId", (req, res) => {
    buscarCurso(req.params.cursoId);

    const indice = alumnos.findIndex(
        a => a.id === Number(req.params.alumnoId) &&
             a.cursoId === Number(req.params.cursoId)
    );

    if (indice === -1) {
        throw new ErrorHTTP("Alumno no encontrado", 404);
    }

    alumnos.splice(indice, 1);

    res.status(204).end();
});

module.exports = router;
