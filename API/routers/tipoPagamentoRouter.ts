import { Router } from 'express';
import { cTipoPagamento } from '../controllers/tipoPagamentoController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/tipo/pagamento', auth, cTipoPagamento.listar)
router.get('/tipo/pagamento/:id', auth, cTipoPagamento.buscar)
router.post('/tipo/pagamento', auth, cTipoPagamento.adicionar);
router.put('/tipo/pagamento/', auth, cTipoPagamento.atualizar)
router.delete('/tipo/pagamento/:id', auth, cTipoPagamento.deletar)