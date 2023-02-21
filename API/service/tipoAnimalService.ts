import { TipoAnimalModel } from "../models/tipoAnimalModels";

export class TipoAnimalService {

    static async listar() {
        try {
            return TipoAnimalModel.listar()
        } catch (error) {
            return error
        }
    }
}