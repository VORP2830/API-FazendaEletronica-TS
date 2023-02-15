import { Router } from 'express';
import { TipoAnimalController } from '../controllers/tipoAnimalController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/animal', auth, TipoAnimalController.listar);