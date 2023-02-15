import { Router } from 'express';
import { UsuarioController } from "../controllers/usuarioController";
import { auth } from '../auth/auth'

export const router = Router();

router.post('/usuario/register', UsuarioController.adicionar);
router.post('/usuario/login', UsuarioController.login);
router.post('/usuario/alterarsenha', auth, UsuarioController.alterarSenhaInterno);