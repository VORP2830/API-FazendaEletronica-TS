import { Request, Response } from 'express';
import { UsuarioService } from '../service/usuarioService';
import { idUsuarioLogado } from '../utils/usuarioLogado';
import { hashSync } from 'bcrypt';

export class UsuarioController {

    static async adicionar (req: Request, res: Response) {
        const { login, senha, nome, email }: any = req.body;
            const usuario = new UsuarioService({
                login: login.toLowerCase().trim(),
                senha: hashSync(senha, 10),
                nome,
                email: email.toLowerCase().trim()
            })
    
            const result: any = await UsuarioService.adicionar(usuario)
            res.status(result.code).json(result.result)
    }

    static async login (req: Request, res: Response) {
        const { login, senha }: any = req.body;
        const usuario = new UsuarioService({
            login: login.toLowerCase().trim(),
            senha,
        })
        const result: any = await UsuarioService.login(usuario)
        res.status(result.code).json(result.result)
    }

    static async alterarSenhaInterno (req: Request, res: Response) {
        const { senha } = req.body
        const usuario = new UsuarioService({
            idUsuario: await idUsuarioLogado(req),
            senha: hashSync(senha, 10)
        })
        const result:any = await UsuarioService.alterarSenha(usuario)
        res.status(result.code).json(result.result)
    }

    static async autenticado (req: Request, res: Response) {
        const token: any = req.headers.token;
        const result: any = await UsuarioService.autenticado(token)
        res.status(result.code).json(result.result)
    }
}