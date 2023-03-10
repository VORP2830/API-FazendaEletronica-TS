import { body } from 'express-validator';

export const animalValidation = () => {
    return[
        body('numero')
        .isString()
        .withMessage('O numero do animal é obrigatorio'),

        body('charSexo')
        .isString()
        .withMessage('O sexo do animal é obrigatoria'),

        body('idFinalidade')
        .isString()
        .withMessage('A finalidade do animal é obrigatorio'),

        body('idStatus')
        .isString()
        .withMessage('O status do animal é obrigatorio'),

        body('idTipoAnimal')
        .isString()
        .withMessage('O tipo do animal é obrigatorio')
    ]
}