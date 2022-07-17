import { Request, Response } from "express";
import { authService, CreateUserData } from "../services/auth.service.js";

export const logon = async (req: Request, res: Response) => {
    const { email, password }: CreateUserData = req.body;
    await authService.createUser(email, password);
    res.sendStatus(201);
}

export const login = async (req: Request, res: Response) => {
    const { email, password }: CreateUserData = req.body;
    const token = await authService.login(email, password);
    res.send(token).status(200);
}