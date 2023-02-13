import { mPagamento } from "../models/pagamentoModels";
import { iPagamento } from "../interface/pagamento";

export class sPagamento {
    idPagamento?: number;
    idCriador: number;
    idTipo?: number;
    charTipo: string;
    descricao?: string;
    dataPagamento: Date;
    valorPagamento: number;

    constructor(pagamento: iPagamento){
        this.idPagamento = pagamento.idPagamento;
        this.idCriador = pagamento.idCriador;
        this.idTipo = pagamento.idTipo;
        this.charTipo = pagamento.charTipo;
        this.descricao = pagamento.descricao;
        this.dataPagamento = pagamento.dataPagamento;
        this.valorPagamento = pagamento.valorPagamento;
    }
    static async adicionar (pagamento: iPagamento) {
        return await mPagamento.adicionar(pagamento)
    }

    static async buscar (idUsuarioLogado: number, idPagemento: number) {
        if(await mPagamento.temPermissao(idUsuarioLogado, idPagemento)) return await mPagamento.buscarId(idPagemento)
        else return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
    }

    static async deletar (idUsuarioLogado: number, idPagemento: number) {
        if (await mPagamento.temPermissao(idUsuarioLogado, idPagemento)) return await mPagamento.deletar(idPagemento)
        else return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
    }

    static async atualizar (idUsuarioLogado: number, pagamento: iPagamento) {
        if (await mPagamento.temPermissao(idUsuarioLogado, pagamento.idPagamento as number))return await mPagamento.atualizar(pagamento)
        else return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}}
    }

    static async listar (idUsuarioLogado: number) {
        return await mPagamento.listar(idUsuarioLogado)
    }

    static async totalPagamentos (idUsuarioLogado: number) {
        return await mPagamento.totalPagamentos(idUsuarioLogado)
    }
}