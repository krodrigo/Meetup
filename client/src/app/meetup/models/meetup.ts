export class Meetup {
    public validationMessages: { [key: string]: { [key: string]: string } } = {
        nome: {
            required: "O nome é obrigatório",
            minlength: "O nome deve ter no mínimo 3 caracteres",
            maxlength: "O nome deve ter no máximo 100 caracteres"
        },
        descricao: {
            required: 'A descrição é obrigatória',
            minlength: 'A descrição deve ter no mínimo 10 caracteres',
            maxlength: 'A descrição deve ter no máximo 1000 caracteres'
        },
        local: {
            required: 'O local é obrigatório',
            minlength: 'O local deve ter no mínimo 10 caracteres',
            maxlength: 'O local deve ter no máximo 1000 caracteres'
        },
        data: {
            required: 'Informe a data'
        }
    };

    id: number;
    nome: string;
    descricao: string;
    data: Date;
    local: string;
}
