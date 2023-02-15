import { Request, Response } from "express"
import { TipoStatusService } from "../service/tipoStatusService"

export class TipoStatusController {


    static async listar(req: Request, res: Response) {
        const result: any =  await TipoStatusService.listar()
        res.status(result.code).json(result.result)
    }
}