class ErrorHTTP extends Error {
    constructor(mensaje, estado = 500){
        super(mensaje);

        this.name = "ErrorHTTP";
        this.estado= estado;
    }
}

module.exports = ErrorHTTP;