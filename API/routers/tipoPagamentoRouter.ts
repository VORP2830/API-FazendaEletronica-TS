import { Router } from 'express';
import { TipoPagamentoController } from '../controllers/tipoPagamentoController';
import { auth } from '../auth/auth'
import { validate } from '../validations/validate';
import { tipoPagamentoValidation } from '../validations/tipoPagamentoValidations';

export const router = Router();

router.get('/tipo/pagamento', auth, TipoPagamentoController.listar)
router.get('/tipo/pagamento/:id', auth, TipoPagamentoController.buscar)
router.post('/tipo/pagamento', auth, tipoPagamentoValidation(), validate, TipoPagamentoController.adicionar);
router.put('/tipo/pagamento', auth, tipoPagamentoValidation(), validate, TipoPagamentoController.atualizar)
router.delete('/tipo/pagamento/:id', auth, TipoPagamentoController.deletar)