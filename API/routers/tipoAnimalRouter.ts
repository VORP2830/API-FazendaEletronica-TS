import { Router } from 'express';
import { cTipoAnimal } from '../controllers/tipoAnimalController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/animal', auth, cTipoAnimal.listar);