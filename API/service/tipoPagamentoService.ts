import { iTipoPagamento } from "../interface/tipoPagamento"
import { mTipoPagamento } from "../models/tipoPagamentoModels"

export class sTipoPagamento {
    idTipoPagamento?: number;
    nome: string;
    descricao: string;
    idCriador: number;
    ativo?: number;

    constructor(tipoPagamento: iTipoPagamento){
        this.idTipoPagamento = tipoPagamento.idTipoPagamento;
        this.idCriador = tipoPagamento.idCriador;
        this.nome = tipoPagamento.nome;
        this.descricao = tipoPagamento.descricao;
        this.ativo = tipoPagamento.ativo;
    }

    static async adicionar (tipoPagamento: iTipoPagamento) {
        return await mTipoPagamento.adicionar(tipoPagamento)
    }

    static async atualizar (idUsuarioLogado: number, tipoPagamento: iTipoPagamento) {
        if (await mTipoPagamento.temPermissao(idUsuarioLogado, tipoPagamento.idTipoPagamento as number)){
            return await mTipoPagamento.atualizar(tipoPagamento)
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
        }
    }

    static async deletar (idUsuarioLogado: number, idPagamento: number) {
        if (await mTipoPagamento.temPermissao(idUsuarioLogado, idPagamento)){
            return await mTipoPagamento.deletar(idPagamento)
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
        }
    }

    static async buscar (idUsuarioLogado: number, idPagamento: number) {
        if (await mTipoPagamento.temPermissao(idUsuarioLogado, idPagamento)){
            return await mTipoPagamento.buscarId(idPagamento)
        } else {
           return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
        }
    }

    static async listar (idUsuarioLogado: number) {
        return await mTipoPagamento.listar(idUsuarioLogado)
    }
}