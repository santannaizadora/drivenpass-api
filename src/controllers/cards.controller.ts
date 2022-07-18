import { Request, Response } from "express";
import { CreateCardData, cardsService } from "../services/cards.service.js";

export const createCard = async (req: Request, res: Response) => {
  const { number, expiry, cvv, password, is_virtual, type, label }: CreateCardData = req.body;
  const { user } = res.locals;
  const user_id = user.id;
  await cardsService.createCard({ number, expiry, cvv, password, is_virtual, type, label, user_id });
  res.sendStatus(201);
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const user_id = user.id;
  const card = await cardsService.getOne(parseInt(id), user_id);
  res.json(card);
}

export const getAll = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const user_id = user.id;
  const cards = await cardsService.getAll(user_id);
  res.json(cards);
}

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const user_id = user.id;
  await cardsService.deleteCard(parseInt(id), user_id);
  res.sendStatus(204);
}