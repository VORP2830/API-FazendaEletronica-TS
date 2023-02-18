import { RelatorioModels } from "../models/relatorioModels";

export class RelatorioService {

    static async relatorioMediaFilhosAnimal (idUsuarioLogado: number) {
        return await RelatorioModels.relatorioMediaFilhosAnimal(idUsuarioLogado)
    }

    static async relatorioPagamentoPorAno(idUsuarioLogado: number) {
        return await RelatorioModels.relatorioPagamentoPorAno(idUsuarioLogado)
    }

    static async relatorioTipoPagamento(idUsuarioLogado: number) {
        return await RelatorioModels.relatorioTipoPagamento(idUsuarioLogado)
    }
}