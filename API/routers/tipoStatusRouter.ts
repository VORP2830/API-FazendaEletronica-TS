import { Router } from 'express';
import { TipoStatusController } from '../controllers/tipoStatusController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/status', auth, TipoStatusController.listar);