import { Request, Response } from "express-serve-static-core";
import { TipoPagamentoService } from "../service/tipoPagamentoService";
import { idUsuarioLogado } from "../utils/usuarioLogado";

export class TipoPagamentoController {

    static async adicionar (req: Request, res: Response) {
        const { nome, descricao } = req.body;
        const tipopagamento = new TipoPagamentoService({
            nome,
            descricao,
            idCriador: await idUsuarioLogado(req)
        })
        const result: any = await TipoPagamentoService.adicionar(tipopagamento)
        res.status(result.code).json(result.result)
    }
    //Atualizar não esta funcionando
    static async atualizar (req: Request, res: Response) {
        const { idTipoPagamento, nome, descricao } = req.body;
        const tipopagamento = new TipoPagamentoService({
            idTipoPagamento,
            nome,
            descricao,
            idCriador: await idUsuarioLogado(req)
        })
        const result: any  = await TipoPagamentoService.atualizar(await idUsuarioLogado(req), tipopagamento)
        res.status(result.code).json(result.result)
    }

    static async deletar (req: Request, res: Response) {
        const result: any  = await TipoPagamentoService.deletar(await idUsuarioLogado(req), +req.params.id) 
        res.status(result.code).json(result.result)
    }

    static async buscar (req: Request, res: Response) {
        const result: any  = await TipoPagamentoService.buscar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }

    static async listar (req: Request, res: Response) {
        const result: any  = await TipoPagamentoService.listar(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }
};