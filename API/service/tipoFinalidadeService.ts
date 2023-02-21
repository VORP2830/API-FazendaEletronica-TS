import { TipoFinalidadeModel } from "../models/tipoFinalidadeModels";

export class TipoFinalidadeService {

    static async listar(){
        try {
            return await TipoFinalidadeModel.listar()
        } catch (error) {
            return error
        }
    }
}