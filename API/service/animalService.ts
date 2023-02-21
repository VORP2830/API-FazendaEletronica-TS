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
    dataVenda?: Date;

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
        this.dataVenda = animal.dataVenda;
    }

    static async adicionar (animal: InterfaceAnimal) {
        try {
            return await AnimalModel.adicionar(animal);
        } catch (error) {
            return error
        }
    };

    static async buscar (idUsuarioLogado: number, idAnimal : number) {
        try {
            if (await AnimalModel.temPermissao(idUsuarioLogado, idAnimal)){
                return await AnimalModel.buscarId(idAnimal);
            } else {
                return {code: 200, result: {error: `Você não tem permissão para realizar essa operação`}};
            }
        } catch (error) {
            return error
        }
    }

    static async deletar (idUsuarioLogado: number, idAnimal: number) {
        try {
            if (await AnimalModel.temPermissao(idUsuarioLogado, idAnimal)){
                return await AnimalModel.deletar(idAnimal);
            } else {
                return {code: 200, result: {error: `Você não tem permissão para realizar essa operação`}};
            };
        } catch (error) {
            return error
        }
    }

    static async atualizar (idUsuarioLogado: number, animal: InterfaceAnimal) {
        try {
            if (await AnimalModel.temPermissao(idUsuarioLogado, animal.idAnimal as number)){
                return await AnimalModel.atualizar(animal);
            } else {
                return {code: 200, result: {error: `Você não tem permissão para realizar essa operação`}};
            };
        } catch (error) {
            return error
        }
    }

    static async telaPrincipal (idUsuarioLogado: number) {
        try {
            return await AnimalModel.telaPrincipal(idUsuarioLogado);
        } catch (error) {
            return error
        }
    };

    static async listarCampo (idUsuarioLogado: number) {
        try {
            return await AnimalModel.listarCampo(idUsuarioLogado);
        } catch (error) {
            return error
        }
    };

    static async listarVendido (idUsuarioLogado: number) {
        try {
            return await AnimalModel.listarVendido(idUsuarioLogado);
        } catch (error) {
            return error
        }
    };

    static async listarMorto (idUsuarioLogado: number) {
        try {
            return await AnimalModel.listarMorto(idUsuarioLogado);
        } catch (error) {
            return error
        }
    };

    static async listarPai (idUsuarioLogado: number) {
        try {
            return await AnimalModel.listarPai(idUsuarioLogado);
        } catch (error) {
            return error
        }
    };
}