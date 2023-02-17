import { Router } from 'express';
import { AnimalController } from '../controllers/animalController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/animal/telaprincipal', auth, AnimalController.telaPrincipal);
router.get('/animal/campo', auth, AnimalController.listarCampo);
router.get('/animal/vendido', auth, AnimalController.listarVendido);
router.get('/animal/morto', auth, AnimalController.listarMorto);
router.get('/animal/pai', auth, AnimalController.listarPai);
router.get('/animal/:id', auth, AnimalController.buscar);
router.get('/animal/media/filhos', auth, AnimalController.listarMediaFilhosAnimal);
router.post('/animal', auth, AnimalController.adicionar);
router.put('/animal', auth, AnimalController.atualizar);
router.delete('/animal/:id', auth, AnimalController.deletar);