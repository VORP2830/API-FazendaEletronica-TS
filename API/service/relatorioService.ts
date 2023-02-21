import { RelatorioModels } from "../models/relatorioModels";

export class RelatorioService {

    static async relatorioMediaFilhosAnimal (idUsuarioLogado: number) {
        try {
            return await RelatorioModels.relatorioMediaFilhosAnimal(idUsuarioLogado)
        } catch (error) {
            return error
        }
    }

    static async relatorioPagamentoPorAno(idUsuarioLogado: number) {
        try {
            return await RelatorioModels.relatorioPagamentoPorAno(idUsuarioLogado)
        } catch (error) {
            return error
        }
    }

    static async relatorioTipoPagamento(idUsuarioLogado: number) {
        try {
            return await RelatorioModels.relatorioTipoPagamento(idUsuarioLogado)
        } catch (error) {
            return error
        }
    }

    static async relatorioMortosVendidosAno (idUsuarioLogado: number) {
        try {
            return await RelatorioModels.relatorioMortosVendidosAno(idUsuarioLogado)
        } catch (error) {
            return error
        }
    }
}