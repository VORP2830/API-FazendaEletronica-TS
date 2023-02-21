import { InterfaceUsuario } from "../interface/usuario";
import { db } from "../config/database";

export class UsuarioModel {

    static async adicionar (usuario: InterfaceUsuario) {
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Usuario (TXT_LOGIN, TXT_PASSWORD, TXT_NOME, TXT_EMAIL) VALUES (?, ?, ?, ?)`,
            [usuario.login, usuario.senha, usuario.nome, usuario.email], erro => {
                if (erro) rejects({code: 200, result: {error: `Não foi possivel cadastrar esse usuario: ${erro}`}});
                else return resolve({code: 200, result: {result: "Usuario adicionado com sucesso"}});
            })
        })
    }
    
    static async alterarSenha (usuario: InterfaceUsuario) {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Usuario SET TXT_PASSWORD = ? WHERE ID_INT_USUARIO = ?`, 
            [usuario.senha, usuario.idUsuario], (erro) => {
                if (erro) rejects({code: 200, result: {error: `Erro ao alterar senha: ${erro}`}});
                else return resolve({code: 200, result: {result: "Senha alterada com sucesso"}});
            })
        })
    }

    static async buscarId (idUsuario: number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE ID_INT_USUARIO = ?`, 
            [idUsuario], (erro, result) => {
                if (erro) rejects({code: 200, result: {error: `Erro ao buscar usuario: ${erro}`}})
                else resolve({code: 200, result: {result: result}});
            })
        })
    }

    static async buscarEmail (email: string) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_EMAIL = ?`,
            [email], (erro, result) => {
                if (erro) rejects({code: 200, result: {error: `Erro ao buscar email: ${erro}`}});
                else resolve({code: 200, result: {result: result}});
            })
        })
    }

    static async buscarLogin (login: string) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_LOGIN = ?`,
            [login], (erro, result) => {
                if (erro) rejects({code: 200, result: {error: `Erro ao buscar login: ${erro}`}});
                else resolve({code: 200, result: {result: result}});
            })
        })
    }
}