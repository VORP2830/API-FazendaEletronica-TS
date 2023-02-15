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
        return await TipoPagamentoModel.adicionar(tipoPagamento)
    }

    static async atualizar (idUsuarioLogado: number, tipoPagamento: InterfaceTipoPagamento) {
        if (await TipoPagamentoModel.temPermissao(idUsuarioLogado, tipoPagamento.idTipoPagamento as number)){
            return await TipoPagamentoModel.atualizar(tipoPagamento)
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
        }
    }

    static async deletar (idUsuarioLogado: number, idPagamento: number) {
        if (await TipoPagamentoModel.temPermissao(idUsuarioLogado, idPagamento)){
            return await TipoPagamentoModel.deletar(idPagamento)
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
        }
    }

    static async buscar (idUsuarioLogado: number, idPagamento: number) {
        if (await TipoPagamentoModel.temPermissao(idUsuarioLogado, idPagamento)){
            return await TipoPagamentoModel.buscarId(idPagamento)
        } else {
           return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
        }
    }

    static async listar (idUsuarioLogado: number) {
        return await TipoPagamentoModel.listar(idUsuarioLogado)
    }
}