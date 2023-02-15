import { Response, Request } from "express";
import { PagamentoService } from "../service/pagamentoService";
import { idUsuarioLogado } from "../utils/usuarioLogado";

export class PagamentoController {

    static async adicionar (req: Request, res: Response) {
        const { idTipo, charTipo, descricao, dataPagamento, valorPagamento} = req.body;
        const pagamento = new PagamentoService({
            idCriador: await idUsuarioLogado(req),
            idTipo,
            charTipo,
            descricao,
            dataPagamento,
            valorPagamento
        })
        const result: any = await PagamentoService.adicionar(pagamento)
        res.status(result.code).json(result.result)
    }

    static async atualizar (req: Request, res: Response) {
        const { idPagamento, idTipo, charTipo, descricao, dataPagamento, valorPagamento} = req.body;
        const pagamento = new PagamentoService({
            idPagamento,
            idCriador: await idUsuarioLogado(req),
            idTipo,
            charTipo,
            descricao,
            dataPagamento,
            valorPagamento
        })
        const result: any = await PagamentoService.atualizar(await idUsuarioLogado(req), pagamento)
        res.status(result.code).json(result.result)
    }

    static async buscar (req: Request, res: Response) {
        const result: any = await PagamentoService.buscar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }

    static async deletar (req: Request, res: Response) {
        const result: any = await PagamentoService.deletar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }

    static async listar (req: Request, res: Response) {
        const result: any = await PagamentoService.listar(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async totalPagamentos (req: Request, res: Response) {
        const result: any = await PagamentoService.totalPagamentos(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }
}