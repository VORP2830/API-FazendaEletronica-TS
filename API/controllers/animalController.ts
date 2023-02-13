import { Request, Response } from "express";
import { iAnimal } from "../interface/animal";
import { sAnimal } from "../service/animalService";
import { idUsuarioLogado } from "../utils/usuarioLogado";

export class cAnimal {
    
    static async buscar (req: Request, res: Response) {
        const result: any = await sAnimal.buscar(await idUsuarioLogado(req), +req.params.id);
        res.status(result.code).json(result.result);
    }

    static async listarMorto (req: Request, res: Response) {
        const result:any = await sAnimal.listarMorto(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async listarCampo (req: Request, res: Response) {
        const result: any = await sAnimal.listarCampo(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async listarVendido (req: Request, res: Response) {
        const result: any = await sAnimal.listarVendido(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async adicionar (req: Request, res: Response) {
        const { numero, idPai, charSexo, idFinalidade, apelido, nascimento, idStatus, idTipoAnimal } = req.body;
        const animal = new sAnimal({
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
        const result: any = await sAnimal.adicionar(animal)
        res.status(result.code).json(result.result)
    }

    static async deletar (req: Request, res: Response) {
        const result: any = await sAnimal.deletar(await idUsuarioLogado(req), +req.params.id)
        res.status(result.code).json(result.result)
    }
    
    static async listarPai (req: Request, res: Response) {
        const result: any = await sAnimal.listarPai(await idUsuarioLogado(req));
        res.status(result.code).json(result.result)
    }

    static async telaPrincipal (req: Request, res: Response) {
        const result: any = await sAnimal.telaPrincipal(await idUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async atualizar (req: Request, res: Response) {
        const { idAnimal, numero, idPai, charSexo, idFinalidade, apelido, nascimento, idStatus, idTipoAnimal } = req.body;
        const animal = new sAnimal({
            idAnimal,
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
        const result: any = await sAnimal.atualizar(await idUsuarioLogado(req), animal)
        res.status(result.code).json(result.result)
    }

}