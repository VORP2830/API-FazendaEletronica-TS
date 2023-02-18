import { Response, Request } from "express";
import { RelatorioService } from "../service/relatorioService";
import { idUsuarioLogado } from "../utils/usuarioLogado";

export class RelatorioController {

    static async relatorioMediaFilhosAnimal(req: Request, res: Response) {
        const result: any = await RelatorioService.relatorioMediaFilhosAnimal(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async relatorioPagamentoPorAno (req: Request, res: Response) {
        const result: any = await RelatorioService.relatorioPagamentoPorAno(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async relatorioTipoPagamento (req: Request, res: Response) {
        const result: any = await RelatorioService.relatorioTipoPagamento(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async relatorioMortosVendidosAno (req: Request, res: Response) {
        const result: any = await RelatorioService.relatorioMortosVendidosAno(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

}