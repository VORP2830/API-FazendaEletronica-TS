import { body } from 'express-validator';

export const registerValidation = () => {
    return[
        body('login')
        .isString()
        .withMessage('O login é obrigatorio'),

        body('senha')
        .isString()
        .withMessage('A senha é obrigatoria'),

        body('nome')
        .isString()
        .withMessage('O nome é obrigatorio'),

        body('email')
        .isString()
        .withMessage('O email é obrigatorio')
        .isEmail()
        .withMessage('O email tem que ser valido')
    ]
}

export const loginValidation = () => {
    return[
        body('login')
        .isString()
        .withMessage('O login é obrigatorio'),

        body('senha')
        .isString()
        .withMessage('A senha é obrigatoria')
    ]
}