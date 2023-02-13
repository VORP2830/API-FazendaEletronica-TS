import { iPagamento } from "../interface/pagamento";
import { db } from "../config/database";

export class mPagamento{

    static async adicionar (pagamento: iPagamento) {
        return new Promise((resolve, rejects) => {
            db.query(`
            INSERT INTO TB_Pagamento
            (ID_INT_USUARIO_CRIADOR, ID_INT_TIPO_PAGAMENTO ,CHAR_TIPO_ENTRADA_SAIDA,TXT_DESCRICAO,DAT_PAGAMENTO,VLR_PAGAMENTO)
            VALUES(?,?,?,?,?,?)`, 
            [pagamento.idCriador, pagamento.idTipo, pagamento.charTipo, pagamento.descricao, pagamento.dataPagamento,pagamento.valorPagamento],
            erro => {
                if (erro) rejects({code: 500, result: {error: `Erro ao inserir pagamento: ${erro}`}})
                else resolve({code: 201, result: {result: `Pagamento adicionado`}})
            })
        })
    }

    static async  atualizar (pagamento: iPagamento) {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Pagamento
                SET ID_INT_TIPO_PAGAMENTO = ?, CHAR_TIPO_ENTRADA_SAIDA = ?, 
                TXT_DESCRICAO = ?, DAT_PAGAMENTO = ?, VLR_PAGAMENTO = ?
                WHERE ID_INT_PAGAMENTO = ?`,
                [pagamento.idTipo, pagamento.charTipo, pagamento.descricao, pagamento.dataPagamento, 
                    pagamento.valorPagamento, pagamento.idPagamento], erro => {
                    if (erro) rejects({code: 500, result: {error: `Erro ao atualizar pagamento: ${erro}`}})
                    else resolve ({code: 200, result: {result: `Pagamento alterado`}})
                })
        })
    }

    static async buscarId (idPagamento: Number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`, 
            [idPagamento], (erro, result) => {
                if (erro) rejects({code: 500, result: {error: `Pagamento inexistente`}});
                else resolve({code: 200, result: {result: result}});
            })
        })
    }

    static async deletar (idPagamento: Number) {
        return new Promise((resolve, rejects) => {
            db.query(`DELETE FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`,[idPagamento], (erro) => {
                if (erro) rejects({code: 500, result: `Erro ao deletar pagamento: ${erro}`});
                else resolve({code: 200, result: {result: "Pagamento excluido"}})
            })
        })
    }

    static async totalPagamentos (IdUsuarioLogado: Number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT CHAR_TIPO_ENTRADA_SAIDA, SUM(VLR_PAGAMENTO) AS TOTAL_CALCULADO
                        FROM FazendaEletronica.TB_Pagamento 
                        WHERE ID_INT_USUARIO_CRIADOR = ? AND 
                        YEAR(DAT_PAGAMENTO ) = YEAR(NOW()) AND MONTH(DAT_PAGAMENTO) = MONTH(NOW())
                        GROUP BY CHAR_TIPO_ENTRADA_SAIDA`, [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, result: {error: `Erro ao pegar pagamentos: ${erro}`}})
                else resolve({code: 200, result: {result: result}})
            })
        })
    }

    static async temPermissao (IdUsuarioLogado: Number, idPagamento: Number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT ID_INT_USUARIO_CRIADOR FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`, [idPagamento], 
            (erro, result: Array<any>) => {
                if (erro) rejects (erro)
                else{
                    if(result.length == 1){
                        if (result[0].ID_INT_USUARIO_CRIADOR == IdUsuarioLogado){
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

    static async listar (IdUsuarioLogado: Number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Pagamento WHERE ID_INT_USUARIO_CRIADOR = ?`, 
            [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, result: {error: "Não existem pagamentos cadastrados"}});
                else resolve ({code: 200, result: {result: result}});
            })
        })
    }
}