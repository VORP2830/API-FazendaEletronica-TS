import { db } from "../config/database";
import { iAnimal } from "../interface/animal";

export class mAnimal{

        static async adicionar(animal: iAnimal) {
            return new Promise((resolve, rejects) => {
                db.query(
                `INSERT INTO TB_Animal
                (ID_INT_USUARIO_CRIADOR, INT_NUMERO_ANIMAL, ID_INT_PAI, CHA_SEXO, 
                ID_INT_FINALIDADE, TXT_APELIDO, DAT_NASCIMENTO, ID_INT_STATUS, ID_INT_TIPO_ANIMAL)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [animal.idCriador, animal.numero, animal.idPai, animal.charSexo, animal.idFinalidade, 
                animal.apelido, animal.nascimento, animal.idStatus, animal.idTipoAnimal], (erro: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 201, result: {result: "Animal cadastrado com sucesso"}});
                }
                )
            })
        }

        static async buscarId (idAnimal: Number) {
            return new Promise((resolve, rejects) => {
                db.query(
                `SELECT * FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, 
                [idAnimal], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: `Animal inexistente: ${erro}`}});
                    else resolve ({code: 200, result: {result: result}});
                    }  
                )
            })

        }

        static async deletar (idAnimal: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`DELETE FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, 
                [idAnimal], (erro: any) => {
                    if (erro) rejects({code: 500, result: {error: `Erro ao deletar pagamento: ${erro}`}});
                    else resolve ({code: 200, result: {result: "Animal deletado"}})
                })
            })
        }

        static async atualizar (animal: iAnimal) {
            return new Promise((resolve, rejects) => {
                db.query(`
                UPDATE FROM TB_Animal SET
                INT_NUMERO_ANIMAL = ?, ID_INT_PAI = ?, CHA_SEXO = ?, ID_INT_FINALIDADE = ?, 
                TXT_APELIDO = ?, DAT_NASICMENTO = ?, ID_INT_STATUS = ?, ID_INT_TIPO_ANIMAL = ?
                WHERE ID_INT_ANIMAL = ?`,
                [animal.numero, animal.idPai, animal.charSexo, animal.idFinalidade, animal.apelido, 
                animal.nascimento, animal.idStatus, animal.idTipoAnimal, animal.idAnimal], (erro: any) => {
                    if (erro) rejects({code: 500, result: {error: `Erro ao atualizar pagamento: ${erro}`}});
                    else resolve ({code: 200, result: {result: "Animal alterado com sucesso"}});
                })
            })
        }

        static async buscarPorCriador (idUsuarioLogado: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`SELECT * FROM TB_Animal WHERE ID_INT_USUARIO_CRIADOR = ?`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: `Não existem animais cadastrados: ${erro}`}});
                    else resolve ({code: 200, result: {result: result}});
                })
            }) 
        }

        static async temPermissao (idUsuarioLogado: Number, idAnimal: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`SELECT ID_INT_USUARIO_CRIADOR FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, [idAnimal], 
                (erro: any, result: Array<any>) => {
                    if (erro) rejects (erro)
                    else{
                        if(result.length == 1){
                            if (result[0].ID_INT_USUARIO_CRIADOR == idUsuarioLogado){
                                resolve (true);
                            }else {
                                resolve (false);
                            }
                        }else{
                            resolve (false);
                        }
                    }
                })
            })
        }

        static async listarCampo (idUsuarioLogado: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
                F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
                JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
                JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN
                (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Em Campo')`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async listarVendido (idUsuarioLogado: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
                F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
                JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
                JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN 
                (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Vendido')`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async listarMorto (idUsuarioLogado: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
                F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
                JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
                JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN 
                (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Morto')`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async telaPrincipal (idUsuarioLogado: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SET @IdUser = ?;
                SELECT S.TXT_STATUS, COUNT(*) AS TOTAL FROM TB_Animal A
                            JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                            JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                            WHERE A.ID_INT_USUARIO_CRIADOR = @IdUser AND A.ID_INT_STATUS IN
                            (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Em Campo')
                            GROUP BY S.ID_INT_STATUS
                UNION
                SELECT S.TXT_STATUS, COUNT(*) AS TOTAL FROM TB_Animal A
                            JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                            JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                            WHERE A.ID_INT_USUARIO_CRIADOR = @IdUser AND A.ID_INT_STATUS IN
                            (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS <> 'Em Campo')
                            AND YEAR(A.DAT_MODIFICACAO) = YEAR(NOW()) AND MONTH(A.DAT_MODIFICACAO) = MONTH(NOW())
                            GROUP BY S.ID_INT_STATUS`
                ,[idUsuarioLogado], (erro: any, result: any) => {
                    console.log(erro)
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async listarPai (idUsuarioLogado: Number) {
            return new Promise((resolve, rejects) => {
                db.query(`SELECT ID_INT_ANIMAL, INT_NUMERO_ANIMAL FROM TB_Animal 
                WHERE ID_INT_USUARIO_CRIADOR = ? AND CHA_SEXO = "F" `,
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                    })
            })
        }

}