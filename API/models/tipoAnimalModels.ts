import { db } from "../config/database";

export class TipoAnimalModel {

    static async listar () {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Tipo_Animal`, (erro, result) => {
                if (erro) rejects({code: 200, result: {error: erro}})
                else resolve({code: 200, result: {result: result}})
            })
        })
    }
}