export interface InterfacePagamento {
    idPagamento?: number,
    idCriador: number,
    idTipo?: number,
    charTipo: string,
    descricao?: string,
    dataPagamento: Date,
    valorPagamento: number
}