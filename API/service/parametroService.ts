import { mParametro } from "../models/parametroModels";

export class sParametro {

    static async listar () {
        return await mParametro.textoEmail()
    }
}