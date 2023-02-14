import { Request, Response } from 'express';
import { sUsuario } from '../service/usuarioService';
import { idUsuarioLogado } from '../utils/usuarioLogado';
import { hashSync } from 'bcrypt';

export class cUsuario {

    static async adicionar (req: Request, res: Response) {
        const { login, senha, nome, email }: any = req.body;
            const usuario = new sUsuario({
                login: login.toLowerCase().trim(),
                senha: hashSync(senha, 10),
                nome,
                email: email.toLowerCase().trim()
            })
    
            const result: any = await sUsuario.adicionar(usuario)
            res.status(result.code).json(result.result)
    }

    static async login (req: Request, res: Response) {
        const { login, senha }: any = req.body;
        const usuario = new sUsuario({
            login: login.toLowerCase().trim(),
            senha,
        })
        const result: any = await sUsuario.login(usuario)
        res.status(result.code).json(result.result)
    }

    static async alterarSenhaInterno (req: Request, res: Response) {
        const { senha } = req.body
        const usuario = new sUsuario({
            idUsuario: await idUsuarioLogado(req),
            senha: hashSync(senha, 10)
        })
        const result:any = await sUsuario.alterarSenha(usuario)
        res.status(result.code).json(result.result)
    }
}