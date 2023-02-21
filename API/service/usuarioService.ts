import { UsuarioModel } from "../models/usuarioModels";
import { InterfaceUsuario } from "../interface/usuario";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compareSync } from "bcrypt";

dotenv.config();

const secret: any = process.env.SECRET

export class UsuarioService {
    idUsuario?: number;
    login?: string;
    senha: string;
    email?: string;
    nome?: string;

    constructor(usuario: InterfaceUsuario){
        this.idUsuario = usuario.idUsuario;
        this.login = usuario.login;
        this.senha = usuario.senha;
        this.email = usuario.email;
        this.nome = usuario.nome;
    }
    
    static async adicionar (usuario: InterfaceUsuario) {
        try {
            const buscarEmail: any = await UsuarioModel.buscarEmail(usuario.email as string);
            const buscarLogin: any = await UsuarioModel.buscarLogin(usuario.login as string);
            if(buscarEmail.result.result.length > 0) return {code: 200, result: {error: `Email já em uso`}}
            else if(buscarLogin.result.result.length > 0) return {code: 200, result: {error: `Login ja em uso`}}
            else if(buscarEmail.result.result.length == 0 && buscarLogin.result.result.length == 0) return await UsuarioModel.adicionar(usuario)
            else return {code: 200, result: {error: `Era para ter dado certo!`}}
        } catch (error) {
            return error
        }
    }

    static async login (usuario: InterfaceUsuario) {
        try {
            const buscarLogin: any = await UsuarioModel.buscarLogin(usuario.login as string);
            if(buscarLogin.result.result.length == 0) return {code: 200, result: {error: `Login ou senha invalidos`}}
            else if(buscarLogin.result.result.length == 1) {
                const senhaCorreta = compareSync(usuario.senha, buscarLogin.result.result[0].TXT_PASSWORD)
                if(senhaCorreta) {
                    const token: string = jwt.sign({ idUsuario: buscarLogin.result.result[0].ID_INT_USUARIO}, secret, {expiresIn: 7200})
                    return { code: 200, result: {token: token} }
                } else return { code: 200, result: {error: `Login ou senha invalidos`}}
            }
        } catch (error) {
            return error
        }
    }

    static async alterarSenha (usuario: InterfaceUsuario) {
        try {
            return await UsuarioModel.alterarSenha(usuario)
        } catch (error) {
            return error
        }
    }

    static async autenticado (token: any) {
        if (!token) return {code: 200, result: {auth: false, error: `Você precisa estar autenticado`}}
        try {
            return new Promise((resolve, reject) => {
                jwt.verify(token, secret, (err: any, decoded: any) => {
                    if (err) reject ({ code: 200, result: {auth: false, error: 'Falha ao tentar autentica o token'} })
                    else resolve ({ code: 200, result: {auth: true, result: 'Usuario autenticado'} })
                  });
            })
        } catch (error) {
            return error
        }
    }
}