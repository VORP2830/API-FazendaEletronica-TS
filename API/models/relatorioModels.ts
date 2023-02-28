import { db } from "../config/database";

export class RelatorioModels {

    static async relatorioMediaFilhosAnimal (idUsuarioLogado: number) {
        return new Promise((resolve, rejects) => {
            db.query(`
            SELECT INT_NUMERO_ANIMAL, COUNT(filhos.ID_INT_ANIMAL) AS QUANTIDADE_FILHOS, 
            IFNULL(COUNT(filhos.ID_INT_ANIMAL) / TIMESTAMPDIFF(YEAR, DAT_NASCIMENTO, NOW()), 0) AS MEDIA_FILHOS_POR_ANO, 
            DAT_NASCIMENTO, TIMESTAMPDIFF(YEAR, DAT_NASCIMENTO, NOW()) AS IDADE FROM TB_Animal LEFT JOIN (
            SELECT ID_INT_ANIMAL, ID_INT_PAI FROM TB_Animal WHERE YEAR(DAT_NASCIMENTO) BETWEEN YEAR(DATE_SUB(NOW(), INTERVAL 1 YEAR)) AND YEAR(NOW())) AS filhos ON TB_Animal.ID_INT_ANIMAL = filhos.ID_INT_PAI
            WHERE ID_INT_USUARIO_CRIADOR = ? AND DAT_NASCIMENTO IS NOT NULL AND CHA_SEXO = 'F' AND ID_INT_STATUS IN (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Em campo')
            GROUP BY INT_NUMERO_ANIMAL, DAT_NASCIMENTO
            ORDER BY MEDIA_FILHOS_POR_ANO DESC`, [idUsuarioLogado], (erro: any, result: any) => {
                if (erro) rejects({code: 200, result: {error: erro}});
                else resolve({code: 200, result: {result: result}});  
            })
        })
    }

    static async relatorioPagamentoPorAno (idUsuarioLogado: number) {
        return new Promise((resolve, rejects) => {
            db.query(`
            SELECT YEAR(DAT_PAGAMENTO) AS ANO,
            SUM(CASE WHEN CHAR_TIPO_ENTRADA_SAIDA = 'E' THEN VLR_PAGAMENTO ELSE 0 END) AS TOTAL_ENTRADAS,
            SUM(CASE WHEN CHAR_TIPO_ENTRADA_SAIDA = 'S' THEN VLR_PAGAMENTO ELSE 0 END) AS TOTAL_SAIDAS,
            SUM(CASE WHEN CHAR_TIPO_ENTRADA_SAIDA = 'E' THEN VLR_PAGAMENTO ELSE -VLR_PAGAMENTO END) AS VALOR_FINAL_ANO
            FROM TB_Pagamento
            WHERE ID_INT_USUARIO_CRIADOR = ?
            GROUP BY ANO`, [idUsuarioLogado], (erro: any, result: any) => {
                if (erro) rejects({code: 200, result: {error: erro}});
                else resolve({code: 200, result: {result: result}});  
            })
        })
    }

    static async relatorioTipoPagamento (idUsuarioLogado: number) {
        return new Promise((resolve, rejects) => {
            db.query(`
            SELECT YEAR(p.DAT_PAGAMENTO) AS ANO,
            t.TXT_NOME AS TIPO_PAGAMENTO,
            SUM(CASE WHEN p.CHAR_TIPO_ENTRADA_SAIDA = 'E' THEN p.VLR_PAGAMENTO ELSE 0 END) AS TOTAL_ENTRADAS,
            SUM(CASE WHEN p.CHAR_TIPO_ENTRADA_SAIDA = 'S' THEN p.VLR_PAGAMENTO ELSE 0 END) AS TOTAL_SAIDAS,
            SUM(CASE WHEN p.CHAR_TIPO_ENTRADA_SAIDA = 'E' THEN p.VLR_PAGAMENTO ELSE -p.VLR_PAGAMENTO END) AS VALOR_FINAL_ANO
            FROM TB_Pagamento p
            JOIN TB_Tipo_Pagamento t ON p.ID_INT_TIPO_PAGAMENTO = t.ID_INT_TIPO_PAGAMENTO
            WHERE p.ID_INT_USUARIO_CRIADOR = ?
            GROUP BY ANO, t.ID_INT_TIPO_PAGAMENTO`, [idUsuarioLogado], (erro: any, result: any) => {
                if (erro) rejects({code: 200, result: {error: erro}});
                else resolve({code: 200, result: {result: result}});  
            })
        })
    }

    static async relatorioMortosVendidosAno (idUsuarioLogado: number) {
        return new Promise((resolve, rejects) => {
            db.query(`
            SELECT 
            YEAR(a.DAT_MODIFICACAO) AS ANO, 
            SUM(CASE WHEN s.TXT_STATUS = 'Vendido' THEN 1 ELSE 0 END) AS VENDIDOS, 
            SUM(CASE WHEN s.TXT_STATUS = 'Morto' THEN 1 ELSE 0 END) AS MORTOS
            FROM TB_Animal a
            JOIN TB_Status s ON a.ID_INT_STATUS = s.ID_INT_STATUS
            WHERE a.ID_INT_USUARIO_CRIADOR = ?
            AND YEAR(a.DAT_MODIFICACAO) IS NOT NULL
            GROUP BY YEAR(a.DAT_MODIFICACAO)
            `, [idUsuarioLogado], (erro: any, result: any) => {
                if (erro) rejects({code: 200, result: {error: erro}});
                else resolve({code: 200, result: {result: result}});  
            })
        })
    }
}
