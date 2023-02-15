import { Request, Response } from "express"
import { TipoAnimalService } from "../service/tipoAnimalService"

export class TipoAnimalController {

    static async listar(req: Request, res: Response) {
        const result: any =  await TipoAnimalService.listar()
        res.status(result.code).json(result.result)
    }
}