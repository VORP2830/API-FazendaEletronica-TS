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
        const buscarEmail: any = await UsuarioModel.buscarEmail(usuario.email as string);
        const buscarLogin: any = await UsuarioModel.buscarLogin(usuario.login as string);
        if(buscarEmail.result.result.length > 0) return {code: 200, result: {error: `Email já em uso`}}
        else if(buscarLogin.result.result.length > 0) return {code: 200, result: {error: `Login ja em uso`}}
        else if(buscarEmail.result.result.length == 0 && buscarLogin.result.result.length == 0) return await UsuarioModel.adicionar(usuario)
        else return {code: 500, result: {error: `Era para ter dado certo!`}}
    }

    static async login (usuario: InterfaceUsuario) {
        const buscarLogin: any = await UsuarioModel.buscarLogin(usuario.login as string);
        if(buscarLogin.result.result.length == 0) return {code: 200, result: {error: `Login ou senha invalidos`}}
        else if(buscarLogin.result.result.length == 1) {
            const senhaCorreta = compareSync(usuario.senha, buscarLogin.result.result[0].TXT_PASSWORD)
            if(senhaCorreta) {
                const token: string = jwt.sign({ idUsuario: buscarLogin.result.result[0].ID_INT_USUARIO}, secret, {expiresIn: 7200})
                return { code: 200, result: {token: token} }
            } else return { code: 200, result: {error: `Login ou senha invalidos`}}
        }
    }

    static async alterarSenha (usuario: InterfaceUsuario) {
        return UsuarioModel.alterarSenha(usuario)
    }
}