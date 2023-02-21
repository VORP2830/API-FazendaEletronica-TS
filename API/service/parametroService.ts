import { ParametroModel } from "../models/parametroModels";

export class ParametroService {

    static async listar () {
        try {
            return await ParametroModel.textoEmail()
        } catch (error) {
            return error
        }
    }
}