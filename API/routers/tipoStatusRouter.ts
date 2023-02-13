import { Router } from 'express';
import { cTipoStatus } from '../controllers/tipoStatusController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/status', auth, cTipoStatus.listar);