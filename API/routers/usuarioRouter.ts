import { Router } from 'express';
import { cUsuario } from "../controllers/usuarioController";
import { auth } from '../auth/auth'

export const router = Router();

router.post('/usuario/register', cUsuario.adicionar);
router.post('/usuario/login', cUsuario.login);
router.post('/usuario/alterarsenha', auth, cUsuario.alterarSenhaInterno);