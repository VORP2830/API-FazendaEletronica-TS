import { Router } from 'express';
import { PagamentoController } from '../controllers/pagamentoController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/pagamento', auth, PagamentoController.listar);
router.get('/pagamento/:id', auth, PagamentoController.buscar);
router.get('/pagamento/total/tela', auth, PagamentoController.totalPagamentos);
router.post('/pagamento', auth, PagamentoController.adicionar);
router.delete('/pagamento/:id', auth, PagamentoController.deletar);