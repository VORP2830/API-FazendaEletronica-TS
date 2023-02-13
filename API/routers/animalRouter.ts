import { Router } from 'express';
import { cAnimal } from '../controllers/animalController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/animal/telaprincipal', auth, cAnimal.telaPrincipal);
router.get('/animal/campo', auth, cAnimal.listarCampo);
router.get('/animal/vendido', auth, cAnimal.listarVendido);
router.get('/animal/morto', auth, cAnimal.listarMorto);
router.get('/animal/pai', auth, cAnimal.listarPai);
router.get('/animal/:id', auth, cAnimal.buscar);
router.post('/animal', auth, cAnimal.adicionar);
router.put('/animal', auth, cAnimal.atualizar);
router.delete('/animal/:id', auth, cAnimal.deletar);