import { AnimalModel } from '../models/animalModels'
import { InterfaceAnimal } from '../interface/animal'

export class AnimalService {
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

    constructor(animal: InterfaceAnimal){
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

    static async adicionar (animal: InterfaceAnimal) {
        return await AnimalModel.adicionar(animal);
    };

    static async buscar (idUsuarioLogado: number, idAnimal : number) {
        if (await AnimalModel.temPermissao(idUsuarioLogado, idAnimal)){
            return await AnimalModel.buscarId(idAnimal);
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}};
        };
    }

    static async deletar (idUsuarioLogado: number, idAnimal: number) {
        if (await AnimalModel.temPermissao(idUsuarioLogado, idAnimal)){
            return await AnimalModel.deletar(idAnimal);
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}};
        };
    }

    static async atualizar (idUsuarioLogado: number, animal: InterfaceAnimal) {
        if (await AnimalModel.temPermissao(idUsuarioLogado, animal.idAnimal as number)){
            return await AnimalModel.atualizar(animal);
        } else {
            return {code: 401, result: {error: `Você não tem permissão para realizar essa operação`}};
        };
    }

    static async telaPrincipal (idUsuarioLogado: number) {
        return await AnimalModel.telaPrincipal(idUsuarioLogado);
    };

    static async listarCampo (idUsuarioLogado: number) {
        return await AnimalModel.listarCampo(idUsuarioLogado);
    };

    static async listarVendido (idUsuarioLogado: number) {
        return await AnimalModel.listarVendido(idUsuarioLogado);
    };

    static async listarMorto (idUsuarioLogado: number) {
        return await AnimalModel.listarMorto(idUsuarioLogado);
    };

    static async listarPai (idUsuarioLogado: number) {
        return await AnimalModel.listarPai(idUsuarioLogado);
    };

}