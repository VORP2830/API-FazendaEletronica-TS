import { TipoFinalidadeModel } from "../models/tipoFinalidadeModels";

export class TipoFinalidadeService {

    static async listar(){
        return await TipoFinalidadeModel.listar()
    }
}