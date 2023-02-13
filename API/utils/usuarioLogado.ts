import { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function idUsuarioLogado (req: Request): Promise<number> {
    const secret: any = process.env.SECRET
    
    return new Promise((resolve, rejects) => {
        const token: any = req.headers.token;

        jwt.verify(token, secret, (erro: any, decoded: any) =>{
            if(erro) rejects (erro);
            else resolve (decoded.idUsuario);
        })
    })
}