import { Router } from 'express';
import { UsuarioController } from "../controllers/usuarioController";
import { loginValidation, registerValidation } from '../validations/usuarioValidations';
import { validate } from '../validations/validate';
import { auth } from '../auth/auth'

export const router = Router();

router.post('/usuario/register', registerValidation(), validate, UsuarioController.adicionar);
router.post('/usuario/login', loginValidation(), validate, UsuarioController.login);
router.post('/usuario/alterarsenha', auth, UsuarioController.alterarSenhaInterno);
router.post('/usuario/autenticado', UsuarioController.autenticado)