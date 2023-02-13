import { Response, Request } from "express";
import { sPagamento } from "../service/pagamentoService";
import { idUsuarioLogado } from "../utils/usuarioLogado";

export class cPagamento{

    static async adicionar (req: Request, res: Response) {
        const { idPagamento, idTipo, charTipo, descricao, dataPagamento, valorPagamento} = req.body;
        const pagamento = new sPagamento({
            idCriador: await idUsuarioLogado(req),
            idTipo,
            charTipo,
            descricao,
            dataPagamento,
            valorPagamento
        })
        const result: any = await sPagamento.adicionar(pagamento)
        res.status(result.code).json(result.result)
    }

    static async atualizar (req: Request, res: Response) {
        const { idPagamento, idTipo, charTipo, descricao, dataPagamento, valorPagamento} = req.body;
        const pagamento = new sPagamento({
            idPagamento,
            idCriador: await idUsuarioLogado(req),
            idTipo,
            charTipo,
            descricao,
            dataPagamento,
            valorPagamento
        })
        const result: any = await sPagamento.atualizar(await idUsuarioLogado(req), pagamento)
        res.status(result.code).json(result.result)
    }

    static async buscar (req: Request, res: Response) {
        const result: any = await sPagamento.buscar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }

    static async deletar (req: Request, res: Response) {
        const result: any = await sPagamento.deletar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }

    static async listar (req: Request, res: Response) {
        const result: any = await sPagamento.listar(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async totalPagamentos (req: Request, res: Response) {
        const result: any = await sPagamento.totalPagamentos(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }
}