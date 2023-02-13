import { mAnimal } from '../models/animalModels'
import { iAnimal } from '../interface/animal'

export class sAnimal {
    idAnimal?: number;
    idCriador: number;
    numero: number;
    idPai?: number;
    charSexo: number;
    idFinalidade: number;
    apelido?: string;
    nascimento?: Date;
    idStatus: number;
    idTipoAnimal: number;

    constructor(animal: iAnimal){
        this.idAnimal = animal.idAnimal;
        this.idCriador = animal.idCriador;
        this.numero = animal.numero;
        this.idPai = animal.idPai;
        this.charSexo = animal.charSexo;
        this.idFinalidade = animal.idFinalidade;
        this.apelido = animal.apelido;
        this.nascimento = animal.nascimento;
        this.idStatus = animal.idStatus;
        this.idTipoAnimal = animal.idTipoAnimal;
    }

    static async adicionar (animal: iAnimal) {
        return await mAnimal.adicionar(animal);
    };

    static async buscar (idUsuarioLogado: number, idAnimal : number) {
        if (await mAnimal.temPermissao(idUsuarioLogado, idAnimal)){
            return await mAnimal.buscarId(idAnimal);
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}};
        };
    }

    static async deletar (idUsuarioLogado: number, idAnimal : number) {
        if (await mAnimal.temPermissao(idUsuarioLogado, idAnimal)){
            return await mAnimal.deletar(idAnimal);
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}};
        };
    }

    static async atualizar (idUsuarioLogado: number, animal: iAnimal) {
        if (await mAnimal.temPermissao(idUsuarioLogado, animal.idAnimal as number)){
            return await mAnimal.atualizar(animal);
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}};
        };
    }

    static async telaPrincipal (idUsuarioLogado: number) {
        return await mAnimal.telaPrincipal(idUsuarioLogado);
    };

    static async listarCampo (idUsuarioLogado: number) {
        return await mAnimal.listarCampo(idUsuarioLogado);
    };

    static async listarVendido (idUsuarioLogado: number) {
        return await mAnimal.listarVendido(idUsuarioLogado);
    };

    static async listarMorto (idUsuarioLogado: number) {
        return await mAnimal.listarMorto(idUsuarioLogado);
    };

    static async listarPai (idUsuarioLogado: number) {
        return await mAnimal.listarPai(idUsuarioLogado);
    };

}