import { ParametroModel } from "../models/parametroModels";

export class ParametroService {

    static async listar () {
        return await ParametroModel.textoEmail()
    }
}