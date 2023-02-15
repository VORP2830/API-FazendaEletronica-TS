import { Router } from 'express';
import { TipoFinalidadeController } from '../controllers/tipoFinalidadeController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/finalidade', auth, TipoFinalidadeController.listar);