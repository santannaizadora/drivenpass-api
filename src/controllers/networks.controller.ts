import { Request, Response } from "express";
import { networksService, CreateNetworkData } from "../services/networks.service.js";

export const createNetwork = async (req: Request, res: Response) => {
  const { name, password, label }: CreateNetworkData = req.body;
  const { user } = res.locals;
  const user_id = user.id;
  await networksService.insert({ name, password, label, user_id });
  res.sendStatus(200);
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const user_id = user.id;
  const network = await networksService.getOne(parseInt(id), user_id);
  res.send(network);
}

export const getAll = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const user_id = user.id;
  const networks = await networksService.getAll(user_id);
  res.send(networks);
}

export const deleteNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const user_id = user.id;
  await networksService.deleteNetwork(parseInt(id), user_id);
  res.sendStatus(200);
}
