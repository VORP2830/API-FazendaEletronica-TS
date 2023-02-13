import express , { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import { app as routes } from './routers/router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(routes)

app.get('/', (req: Request, res: Response ) => {
    res.send('<h1 style="text-align: center;">Bem vindo à API</h1>');
});

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});

module.exports = app;