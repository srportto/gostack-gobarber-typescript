class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    // pasando o valor padrao 400 para status code
    // ou seja, caso não seja enviado o default é 400
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
export default AppError;
