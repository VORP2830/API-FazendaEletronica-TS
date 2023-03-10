import { Router } from 'express';
import { PagamentoController } from '../controllers/pagamentoController';
import { auth } from '../auth/auth'
import { validate } from '../validations/validate';
import { pagamentoValidation } from '../validations/pagamentoValidations';

export const router = Router();

router.get('/pagamento', auth, PagamentoController.listar);
router.get('/pagamento/:id', auth, PagamentoController.buscar);
router.get('/pagamento/total/tela', auth, PagamentoController.totalPagamentos);
router.post('/pagamento', auth, pagamentoValidation(), validate, PagamentoController.adicionar);
router.put('/pagamento', auth, pagamentoValidation(), validate, PagamentoController.atualizar)
router.delete('/pagamento/:id', auth, PagamentoController.deletar);