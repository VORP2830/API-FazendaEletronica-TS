import { db } from "../config/database";

export class TipoStatusModel {

    static async  listar () {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Status`, (erro, result) => {
                if (erro) rejects({code: 200, result: {error: erro}})
                else resolve({code: 200,  result: {result: result}})
            })
        })
    }
}