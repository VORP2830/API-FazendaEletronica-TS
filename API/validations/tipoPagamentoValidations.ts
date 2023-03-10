/*
    idTipoPagamento?: number,
    nome: string,
    descricao: string,
    idCriador: number,
    ativo?: number
*/

import { body } from 'express-validator';

export const tipoPagamentoValidation = () => {
    return[
        body('nome')
        .isString()
        .withMessage('O nome do tipo de pagamento é obrigatorio'),

        body('descricao')
        .isString()
        .withMessage('A descrição é obrigatoria')
    ]
}