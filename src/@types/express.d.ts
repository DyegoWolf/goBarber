// Adicionando informação user em Request
declare namespace Express{
    export interface Request{
        user: {
            id: string;
        }
    }
}
