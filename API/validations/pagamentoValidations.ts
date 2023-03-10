import { body } from 'express-validator';

export const pagamentoValidation = () => {
    return[
        body('charTipo')
        .isString()
        .withMessage('O tipo do pagamento é obrigatorio'),

        body('dataPagamento')
        .isString()
        .withMessage('A data do pagamento é obrigatoria'),

        body('valorPagamento')
        .isString()
        .withMessage('O valor do pagamento é obrigatorio')
    ]
}