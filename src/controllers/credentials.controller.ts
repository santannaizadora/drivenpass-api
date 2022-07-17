import { Request, Response } from "express";
import { CreateCredentialData, credentialsService } from "../services/credentials.service.js";

export const createCredential = async (req: Request, res: Response) => {
    const { url, username, password, title }: CreateCredentialData = req.body;
    const { user } = res.locals;
    const user_id = user.id;
    await credentialsService.createCredential({url, username, password, title, user_id});
    res.sendStatus(201);
}