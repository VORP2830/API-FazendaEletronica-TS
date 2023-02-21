import { InterfaceTipoPagamento } from "../interface/tipoPagamento"
import { TipoPagamentoModel } from "../models/tipoPagamentoModels"

export class TipoPagamentoService {
    idTipoPagamento?: number;
    nome: string;
    descricao: string;
    idCriador: number;
    ativo?: number;

    constructor(tipoPagamento: InterfaceTipoPagamento){
        this.idTipoPagamento = tipoPagamento.idTipoPagamento;
        this.idCriador = tipoPagamento.idCriador;
        this.nome = tipoPagamento.nome;
        this.descricao = tipoPagamento.descricao;
        this.ativo = tipoPagamento.ativo;
    }

    static async adicionar (tipoPagamento: InterfaceTipoPagamento) {
        try {
            return await TipoPagamentoModel.adicionar(tipoPagamento)
        } catch (error) {
            return error
        }
    }

    static async atualizar (idUsuarioLogado: number, tipoPagamento: InterfaceTipoPagamento) {
        try {
            if (await TipoPagamentoModel.temPermissao(idUsuarioLogado, tipoPagamento.idTipoPagamento as number)){
                return await TipoPagamentoModel.atualizar(tipoPagamento)
            } else {
                return {code: 200, result: {error: `Você não tem permissão para realizar essa operação`}}
            }
        } catch (error) {
            return error
        }
    }

    static async deletar (idUsuarioLogado: number, idPagamento: number) {
        try {
            if (await TipoPagamentoModel.temPermissao(idUsuarioLogado, idPagamento)){
                return await TipoPagamentoModel.deletar(idPagamento)
            } else {
                return {code: 200, result: {error: `Você não tem permissão para realizar essa operação`}}
            }
        } catch (error) {
            return error
        }
    }

    static async buscar (idUsuarioLogado: number, idPagamento: number) {
        try {
            if (await TipoPagamentoModel.temPermissao(idUsuarioLogado, idPagamento)){
                return await TipoPagamentoModel.buscarId(idPagamento)
            } else {
               return {code: 200, result: {error: `Você não tem permissão para realizar essa operação`}}
            }
        } catch (error) {
            return error
        }
    }

    static async listar (idUsuarioLogado: number) {
        try {
            return await TipoPagamentoModel.listar(idUsuarioLogado)
        } catch (error) {
            return error
        }
    }
}