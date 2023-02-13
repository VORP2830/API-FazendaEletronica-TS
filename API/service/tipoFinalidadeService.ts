import { mTipoFinalidade } from "../models/tipoFinalidadeModels";

export class sTipoFinalidade {

    static async listar(){
        return await mTipoFinalidade.listar()
    }
}