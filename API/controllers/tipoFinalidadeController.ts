import { Request, Response } from "express"
import { TipoFinalidadeService } from "../service/tipoFinalidadeService"

export class TipoFinalidadeController {

    static async listar(req: Request, res: Response) {
        const result: any = await TipoFinalidadeService.listar()
        res.status(result.code).json(result.result)
    }
}