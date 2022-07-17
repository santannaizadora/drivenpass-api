import { Request, Response } from "express";
import { CreateCredentialData, credentialsService } from "../services/credentials.service.js";

export const createCredential = async (req: Request, res: Response) => {
    const { url, username, password, title }: CreateCredentialData = req.body;
    const { user } = res.locals;
    const user_id = user.id;
    await credentialsService.createCredential({url, username, password, title, user_id});
    res.sendStatus(201);
}

export const findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = res.locals;
    const user_id = user.id;
    const credential = await credentialsService.findOne(parseInt(id), user_id);
    res.send(credential).status(200);
}

export const findAll = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const user_id = user.id;
    const credentials = await credentialsService.findAll(user_id);
    res.send(credentials).status(200);
}

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = res.locals;
    const user_id = user.id;
    await credentialsService.deleteOne(parseInt(id), user_id);
    res.sendStatus(204);
}