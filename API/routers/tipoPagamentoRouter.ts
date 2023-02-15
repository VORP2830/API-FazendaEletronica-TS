import { Router } from 'express';
import { TipoPagamentoController } from '../controllers/tipoPagamentoController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/pagamento', auth, TipoPagamentoController.listar)
router.get('/tipo/pagamento/:id', auth, TipoPagamentoController.buscar)
router.post('/tipo/pagamento', auth, TipoPagamentoController.adicionar);
router.put('/tipo/pagamento/', auth, TipoPagamentoController.atualizar)
router.delete('/tipo/pagamento/:id', auth, TipoPagamentoController.deletar)