import { Router } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser'

import { router as usuarioRouter } from "./usuarioRouter";
import { router as pagamentoRouter } from './pagamentoRouter';
import { router as tipoPagamentoRouter } from './tipoPagamentoRouter';
import { router as animalRouter } from './animalRouter';
import { router as tipoAnimalRouter } from './tipoAnimalRouter';
import { router as tipoFinalidadeRouter } from './tipoFinalidadeRouter';
import { router as tipoStatusRouter } from './tipoStatusRouter';
import { router as relatorioRouter } from './relatorioRouter';

const app = Router();

let CorsOption = {
    origin: '*'
};

app.use(
    cors(CorsOption),
    bodyParser.json(),
    usuarioRouter,
    pagamentoRouter,
    tipoPagamentoRouter,
    animalRouter,
    tipoAnimalRouter,
    tipoFinalidadeRouter,
    tipoStatusRouter,
    relatorioRouter
)

export { app }