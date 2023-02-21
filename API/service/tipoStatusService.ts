import { TipoStatusModel } from "../models/tipoStatusModels";

export class TipoStatusService {

    static async listar () {
        try {
            return await TipoStatusModel.listar()
        } catch (error) {
            return error
        }
    }
}