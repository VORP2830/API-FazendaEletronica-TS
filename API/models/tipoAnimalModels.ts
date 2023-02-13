import { db } from "../config/database";

export class mTipoAnimal {

    static async listar () {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Tipo_Animal`, (erro, result) => {
                if (erro) rejects({code: 500, result: {error: erro}})
                else resolve({code: 200, result: {result: result}})
            })
        })
    }
}