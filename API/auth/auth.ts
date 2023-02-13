import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret: any = process.env.SECRET

export function auth(req: Request, res: Response, next: NextFunction){
    const token: any = req.headers.token;
    if (!token) return res.status(401).json({error: `Você precisa estar autenticado`});
    
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) return res.status(500).json({ auth: false, error: 'Falha ao tentar autentica o token' });
      next();
    });
}