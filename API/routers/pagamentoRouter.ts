import { Router } from 'express';
import { cPagamento } from '../controllers/pagamentoController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/pagamento', auth, cPagamento.listar);
router.get('/pagamento/:id', auth, cPagamento.buscar);
router.get('/pagamento/total/tela', auth, cPagamento.totalPagamentos);
router.post('/pagamento', auth, cPagamento.adicionar);
router.delete('/pagamento/:id', auth, cPagamento.deletar);