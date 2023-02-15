import { TipoStatusModel } from "../models/tipoStatusModels";

export class TipoStatusService {

    static async listar () {
        return await TipoStatusModel.listar()
    }
}