import { rejects } from "assert";
import { db } from "../config/database";
import { InterfaceAnimal } from "../interface/animal";

export class AnimalModel {

        static async adicionar(animal: InterfaceAnimal) {
            return new Promise((resolve, rejects) => {
                db.query(
                `INSERT INTO TB_Animal
                (ID_INT_USUARIO_CRIADOR, INT_NUMERO_ANIMAL, ID_INT_PAI, CHA_SEXO, 
                ID_INT_FINALIDADE, TXT_APELIDO, DAT_NASCIMENTO, ID_INT_STATUS, ID_INT_TIPO_ANIMAL, DAT_MODIFICACAO)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                [animal.idCriador, animal.numero, animal.idPai, animal.charSexo, animal.idFinalidade, 
                animal.apelido, animal.nascimento, animal.idStatus, animal.idTipoAnimal], (erro: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 201, result: {result: "Animal cadastrado com sucesso"}});
                }
                )
            })
        }

        static async buscarId (idAnimal: number) {
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

        static async deletar (idAnimal: number) {
            return new Promise((resolve, rejects) => {
                db.query(`DELETE FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, 
                [idAnimal], (erro: any) => {
                    if (erro) rejects({code: 500, result: {error: `Erro ao deletar pagamento: ${erro}`}});
                    else resolve ({code: 200, result: {result: "Animal deletado"}})
                })
            })
        }

        static async atualizar (animal: InterfaceAnimal) {
            return new Promise((resolve, rejects) => {
                db.query(`
                UPDATE TB_Animal SET
                INT_NUMERO_ANIMAL = ?, ID_INT_PAI = ?, CHA_SEXO = ?, ID_INT_FINALIDADE = ?, 
                TXT_APELIDO = ?, DAT_NASCIMENTO = ?, ID_INT_STATUS = ?, ID_INT_TIPO_ANIMAL = ?, DAT_MODIFICACAO = NOW(), DAT_VENDA = ?
                WHERE ID_INT_ANIMAL = ?`,
                [animal.numero, animal.idPai, animal.charSexo, animal.idFinalidade, animal.apelido, 
                animal.nascimento, animal.idStatus, animal.idTipoAnimal, animal.dataVenda, animal.idAnimal], (erro: any) => {
                    if (erro) rejects({code: 500, result: {error: `Erro ao atualizar pagamento: ${erro}`}});
                    else resolve ({code: 200, result: {result: "Animal alterado com sucesso"}});
                })
            })
        }

        static async buscarPorCriador (idUsuarioLogado: number) {
            return new Promise((resolve, rejects) => {
                db.query(`SELECT * FROM TB_Animal WHERE ID_INT_USUARIO_CRIADOR = ?`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: `Não existem animais cadastrados: ${erro}`}});
                    else resolve ({code: 200, result: {result: result}});
                })
            }) 
        }

        static async temPermissao (idUsuarioLogado: number, idAnimal: number) {
            return new Promise((resolve, rejects) => {
                db.query(`SELECT ID_INT_USUARIO_CRIADOR FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, [idAnimal], 
                (erro: any, result: Array<any>) => {
                    if (erro) rejects (false)
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

        static async listarCampo (idUsuarioLogado: number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, P.INT_NUMERO_ANIMAL AS NUMERO_PAI, A.CHA_SEXO, 
                F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
                JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
                JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                LEFT JOIN TB_Animal P ON A.ID_INT_PAI = P.ID_INT_ANIMAL
                WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN
                (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Em Campo')`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async listarVendido (idUsuarioLogado: number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, P.INT_NUMERO_ANIMAL AS NUMERO_PAI, A.CHA_SEXO, 
                F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME, A.DAT_VENDA FROM TB_Animal A
                JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
                JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                LEFT JOIN TB_Animal P ON A.ID_INT_PAI = P.ID_INT_ANIMAL
                WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN 
                (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Vendido')`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async listarMorto (idUsuarioLogado: number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, P.INT_NUMERO_ANIMAL AS NUMERO_PAI, A.CHA_SEXO, 
                F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
                JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
                JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                LEFT JOIN TB_Animal P ON A.ID_INT_PAI = P.ID_INT_ANIMAL
                WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN 
                (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Morto')`, 
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async telaPrincipal (idUsuarioLogado: number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT S.TXT_STATUS, COUNT(*) AS TOTAL FROM TB_Animal A
                            JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                            JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                            WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN
                            (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Em Campo')
                            GROUP BY S.ID_INT_STATUS
                UNION
                SELECT S.TXT_STATUS, COUNT(*) AS TOTAL FROM TB_Animal A
                            JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                            JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                            WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN
                            (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS <> 'Em Campo')
                            AND YEAR(A.DAT_MODIFICACAO) = YEAR(NOW()) AND MONTH(A.DAT_MODIFICACAO) = MONTH(NOW())
                            GROUP BY S.ID_INT_STATUS`
                ,[idUsuarioLogado, idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                })
            })
        }

        static async listarPai (idUsuarioLogado: number) {
            return new Promise((resolve, rejects) => {
                db.query(`SELECT ID_INT_ANIMAL, INT_NUMERO_ANIMAL FROM TB_Animal 
                WHERE ID_INT_USUARIO_CRIADOR = ? AND CHA_SEXO = "F" `,
                [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});
                    })
            })
        }

        static async listarMediaFilhosAnimal (idUsuarioLogado: number) {
            return new Promise((resolve, rejects) => {
                db.query(`
                SELECT INT_NUMERO_ANIMAL, COUNT(filhos.ID_INT_ANIMAL) AS QUANTIDADE_FILHOS, 
                IFNULL(COUNT(filhos.ID_INT_ANIMAL) / TIMESTAMPDIFF(YEAR, DAT_NASCIMENTO, NOW()), 0) AS MEDIA_FILHOS_POR_ANO, 
                DAT_NASCIMENTO, TIMESTAMPDIFF(YEAR, DAT_NASCIMENTO, NOW()) AS IDADE FROM TB_Animal LEFT JOIN (
                SELECT ID_INT_ANIMAL, ID_INT_PAI FROM TB_Animal WHERE YEAR(DAT_NASCIMENTO) BETWEEN YEAR(DATE_SUB(NOW(), INTERVAL 1 YEAR)) AND YEAR(NOW())) AS filhos ON TB_Animal.ID_INT_ANIMAL = filhos.ID_INT_PAI
                WHERE ID_INT_USUARIO_CRIADOR = ? AND DAT_NASCIMENTO IS NOT NULL AND CHA_SEXO = 'F'
                GROUP BY INT_NUMERO_ANIMAL, DAT_NASCIMENTO
                ORDER BY MEDIA_FILHOS_POR_ANO DESC`, [idUsuarioLogado], (erro: any, result: any) => {
                    if (erro) rejects({code: 500, result: {error: erro}});
                    else resolve({code: 200, result: {result: result}});  
                })
            })
        }

}
