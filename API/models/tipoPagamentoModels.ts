import { InterfaceTipoPagamento } from "../interface/tipoPagamento";
import { db } from "../config/database";

export class TipoPagamentoModel {

    static async adicionar (tipoPagamento: InterfaceTipoPagamento) {
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Tipo_Pagamento (TXT_NOME, TXT_DESCRICAO, ID_INT_USUARIO_CRIADOR, BIT_ATIVO) VALUES (?,?,?,1)`, 
            [tipoPagamento.nome, tipoPagamento.descricao, tipoPagamento.idCriador],
            erro => {
                if (erro) rejects({code: 200, result: {error: `Erro ao adicionar tipo de pagamento: ${erro}`}})
                else resolve ({code: 201 ,result: {result: `Tipo de pagamento adicionado`}})
            })
        })
    }

    static async atualizar (tipoPagamento: InterfaceTipoPagamento) {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Tipo_Pagamento SET TXT_NOME = ?, TXT_DESCRICAO = ?, BIT_ATIVO = ? WHERE ID_INT_TIPO_PAGAMENTO = ?`,
                [tipoPagamento.nome, tipoPagamento.descricao, tipoPagamento.ativo, tipoPagamento.idCriador], erro => {
                    if (erro) rejects({code: 200, result: {error: `Erro ao atualizar tipo de pagamento: ${erro}`}})
                    else resolve({code: 200, result: {result: `Adicionar tipo de pagamento`}})
                })
        })
    }

    static async buscarId (idTipoPagamento: number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Tipo_Pagamento WHERE ID_INT_TIPO_PAGAMENTO = ?`, 
            [idTipoPagamento], (erro, result) => {
                if (erro) rejects({code: 200, result: {error: `Tipo de pagamento inexistente ${erro}`}});
                else resolve({code: 200, result: {result: result}});
            })
        })
    }

    static async deletar (idTipoPagamento: number) {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Tipo_Pagamento SET BIT_ATIVO = 0 WHERE ID_INT_TIPO_PAGAMENTO = ?`,
                [idTipoPagamento], erro => {
                    if (erro) rejects({code: 200, result: {error: `Erro ao deletar tipo de pagamento ${erro}`}})
                    else resolve({code: 200, result: {result: `Tipo de pagamento deletado`}})
                })
        })
    }

    static async listar (idUsuarioLogado: number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Tipo_Pagamento WHERE ID_INT_USUARIO_CRIADOR = ? AND BIT_ATIVO = 1`, 
            [idUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 200, result: {error: `Não existem pagameentos a serem listados: ${erro}`}});
                else resolve({code: 200, result: {result: result}});
            })
        })
    }

    static async temPermissao (idUsuarioLogado: number, idTipoPagamento: number) {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT ID_INT_USUARIO_CRIADOR FROM TB_Tipo_Pagamento WHERE ID_INT_TIPO_PAGAMENTO = ?`, [idTipoPagamento], 
            (erro, result: Array<any>) => {
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
}