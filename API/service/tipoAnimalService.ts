import { TipoAnimalModel } from "../models/tipoAnimalModels";

export class TipoAnimalService {

    static async listar() {
        return TipoAnimalModel.listar()
    }
}