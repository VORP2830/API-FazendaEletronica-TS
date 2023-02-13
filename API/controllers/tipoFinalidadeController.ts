import { Request, Response } from "express"
import { sTipoFinalidade } from "../service/tipoFinalidadeService"

export class cTipoFinalidade {

    static async listar(req: Request, res: Response) {
        const result: any = await sTipoFinalidade.listar()
        res.status(result.code).json(result.result)
    }
}