import { mTipoAnimal } from "../models/tipoAnimalModels";

export class sTipoAnimal {

    static async listar() {
        return mTipoAnimal.listar()
    }
}