import { PagamentoModel } from "../models/pagamentoModels";
import { InterfacePagamento } from "../interface/pagamento";

export class PagamentoService {
    idPagamento?: number;
    idCriador: number;
    idTipo?: number;
    charTipo: string;
    descricao?: string;
    dataPagamento: Date;
    valorPagamento: number;

    constructor(pagamento: InterfacePagamento){
        this.idPagamento = pagamento.idPagamento;
        this.idCriador = pagamento.idCriador;
        this.idTipo = pagamento.idTipo;
        this.charTipo = pagamento.charTipo;
        this.descricao = pagamento.descricao;
        this.dataPagamento = pagamento.dataPagamento;
        this.valorPagamento = pagamento.valorPagamento;
    }
    static async adicionar (pagamento: InterfacePagamento) {
        return await PagamentoModel.adicionar(pagamento)
    }

    static async buscar (idUsuarioLogado: number, idPagemento: number) {
        if(await PagamentoModel.temPermissao(idUsuarioLogado, idPagemento)) return await PagamentoModel.buscarId(idPagemento)
        else return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
    }

    static async deletar (idUsuarioLogado: number, idPagemento: number) {
        if (await PagamentoModel.temPermissao(idUsuarioLogado, idPagemento)) return await PagamentoModel.deletar(idPagemento)
        else return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
    }

    static async atualizar (idUsuarioLogado: number, pagamento: InterfacePagamento) {
        if (await PagamentoModel.temPermissao(idUsuarioLogado, pagamento.idPagamento as number))return await PagamentoModel.atualizar(pagamento)
        else return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
    }

    static async listar (idUsuarioLogado: number) {
        return await PagamentoModel.listar(idUsuarioLogado)
    }

    static async totalPagamentos (idUsuarioLogado: number) {
        return await PagamentoModel.totalPagamentos(idUsuarioLogado)
    }
}