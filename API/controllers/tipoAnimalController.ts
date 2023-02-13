import { Request, Response } from "express"
import { sTipoAnimal } from "../service/tipoAnimalService"

export class cTipoAnimal {

    static async listar(req: Request, res: Response) {
        const result: any =  await sTipoAnimal.listar()
        res.status(result.code).json(result.result)
    }
}