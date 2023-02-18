import { Router } from 'express';
import { RelatorioController } from '../controllers/relatorioController';
import { auth } from '../auth/auth'

export const router = Router();

router.get('/relatorio/tipo/pagamento', auth, RelatorioController.relatorioTipoPagamento);
router.get('/relatorio/pagamento', auth, RelatorioController.relatorioPagamentoPorAno);
router.get('/relatorio/animal/mediafilhos', auth, RelatorioController.relatorioMediaFilhosAnimal);