class AppError{

    /// readonly determina que o valor da variável não poderá ser setado, apenas lido
    public readonly message: string;
    public readonly statusCode: number; // Código HTTP

    // Se não for informado valor para statusCode, a variável possuirá o valor 400
    constructor(message: string, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;
