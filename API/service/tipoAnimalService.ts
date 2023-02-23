import { TipoAnimalModel } from "../models/tipoAnimalModels";

export class TipoAnimalService {

    static async listar() {
        try {
            return await TipoAnimalModel.listar()
        } catch (error) {
            return error
        }
    }
}