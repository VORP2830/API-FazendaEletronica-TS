import { Request, Response } from "express"
import { sTipoStatus } from "../service/tipoStatusService"

export class cTipoStatus {


    static async listar(req: Request, res: Response) {
        const result: any =  await sTipoStatus.listar()
        res.status(result.code).json(result.result)
    }
}