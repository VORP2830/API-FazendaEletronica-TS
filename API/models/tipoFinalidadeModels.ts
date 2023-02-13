import { db } from "../config/database";

export class mTipoFinalidade {

    static async listar () {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Finalidade`, (erro, result) => {
                if (erro) rejects({code: 500, result: {error: erro}})
                else resolve({code: 200, result: {result: result}})
            })
        })
    }
}