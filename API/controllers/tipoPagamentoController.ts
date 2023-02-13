import { Request, Response } from "express-serve-static-core";
import { sTipoPagamento } from "../service/tipoPagamentoService";
import { idUsuarioLogado } from "../utils/usuarioLogado";

export class cTipoPagamento {

    static async adicionar (req: Request, res: Response) {
        const { nome, descricao } = req.body;
        const tipopagamento = new sTipoPagamento({
            nome,
            descricao,
            idCriador: await idUsuarioLogado(req)
        })
        const result: any = await sTipoPagamento.adicionar(tipopagamento)
        res.status(result.code).json(result.result)
    }
    //Atualizar não esta funcionando
    static async atualizar (req: Request, res: Response) {
        const { idTipoPagamento, nome, descricao, ativo } = req.body;
        const tipopagamento = new sTipoPagamento({
            idTipoPagamento,
            nome,
            descricao,
            idCriador: await idUsuarioLogado(req)
        })
        const result: any  = await sTipoPagamento.atualizar(await idUsuarioLogado(req), tipopagamento)
        res.status(result.code).json(result.result)
    }

    static async deletar (req: Request, res: Response) {
        const result: any  = await sTipoPagamento.deletar(await idUsuarioLogado(req), +req.params.id) 
        res.status(result.code).json(result.result)
    }

    static async buscar (req: Request, res: Response) {
        const result: any  = await sTipoPagamento.buscar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }

    static async listar (req: Request, res: Response) {
        const result: any  = await sTipoPagamento.listar(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }
};