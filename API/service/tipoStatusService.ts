import { mTipoStatus } from "../models/tipoStatusModels";

export class sTipoStatus {

    static async listar () {
        return await mTipoStatus.listar()
    }
}