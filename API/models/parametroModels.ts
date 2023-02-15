import { db } from "../config/database";

export class ParametroModel {

    static async  textoEmail () {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Parametro WHERE TXT_CHAVE= 'EMAIL';`, (erro, result) => {
                if (erro) rejects({code: 500, result: {error: erro}})
                else resolve({code: 200,  result: {result: result}})
            })
        })
    }
}