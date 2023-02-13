import { Router } from 'express';
import { cTipoFinalidade } from '../controllers/tipoFinalidadeController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/finalidade', auth, cTipoFinalidade.listar);