import { Request, Response } from "express";
import { notesService } from "../services/notes.service.js";

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const { user } = res.locals;
  const user_id = user.id;
  await notesService.insert({ title, content, user_id });
  res.sendStatus(201);
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const user_id = user.id;
  const note = await notesService.getOne(parseInt(id), user_id);
  res.send(note);
}

export const getAll = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const user_id = user.id;
  const notes = await notesService.getAll(user_id);
  res.send(notes);
}

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const user_id = user.id;
  await notesService.deleteOne(parseInt(id), user_id);
  res.sendStatus(200);
}
