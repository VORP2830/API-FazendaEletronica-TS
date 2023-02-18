import { Request, Response } from "express";
import { AnimalService } from "../service/animalService";
import { idUsuarioLogado } from "../utils/usuarioLogado";

export class AnimalController {
    
    static async buscar (req: Request, res: Response) {
        const result: any = await AnimalService.buscar(await idUsuarioLogado(req), +req.params.id);
        res.status(result.code).json(result.result);
    }

    static async listarMorto (req: Request, res: Response) {
        const result: any = await AnimalService.listarMorto(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async listarCampo (req: Request, res: Response) {
        const result: any = await AnimalService.listarCampo(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async listarVendido (req: Request, res: Response) {
        const result: any = await AnimalService.listarVendido(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async adicionar (req: Request, res: Response) {
        const { numero, idPai, charSexo, idFinalidade, apelido, nascimento, idStatus, idTipoAnimal } = req.body;
        const animal = new AnimalService({
            idCriador: await idUsuarioLogado(req),
            numero,
            idPai,
            charSexo,
            idFinalidade,
            apelido,
            nascimento,
            idStatus,
            idTipoAnimal
        })
        const result: any = await AnimalService.adicionar(animal)
        res.status(result.code).json(result.result)
    }

    static async deletar (req: Request, res: Response) {
        const result: any = await AnimalService.deletar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }
    
    static async listarPai (req: Request, res: Response) {
        const result: any = await AnimalService.listarPai(await idUsuarioLogado(req));
        res.status(result.code).json(result.result)
    }

    static async telaPrincipal (req: Request, res: Response) {
        const result: any = await AnimalService.telaPrincipal(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async atualizar (req: Request, res: Response) {
        const { idAnimal, numero, idPai, charSexo, idFinalidade, apelido, nascimento, idStatus, idTipoAnimal, dataVenda } = req.body;
        const animal = new AnimalService({
            idAnimal,
            idCriador: await idUsuarioLogado(req),
            numero,
            idPai,
            charSexo,
            idFinalidade,
            apelido,
            nascimento,
            idStatus,
            idTipoAnimal,
            dataVenda
        })
        const result: any = await AnimalService.atualizar(await idUsuarioLogado(req), animal)
        res.status(result.code).json(result.result)
    }

}