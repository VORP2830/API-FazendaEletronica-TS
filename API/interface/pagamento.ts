export interface iPagamento {
    idPagamento?: number,
    idCriador: number,
    idTipo?: number,
    charTipo: string,
    descricao?: string,
    dataPagamento: Date,
    valorPagamento: number
}