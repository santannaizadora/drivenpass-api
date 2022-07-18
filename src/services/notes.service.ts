import { Note } from "@prisma/client";
import Cryptr from "cryptr";
import { notesRepository } from "../repositories/notes.repository.js";
import '../setup.js';

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

export type CreateNoteData = Partial<Note>;

const titleIsAvailable = async (title: string, user_id: number) => {
  const note = await notesRepository.getNoteByTitleAndUser(title, user_id);
  if(note){
    throw {
      type: "conflict",
      message: "You already have a note with this title",
    }
  }
}

const findNoteForUser = async (id: number, user_id: number) => {
  const note = await notesRepository.getNoteByIdAndUser(id, user_id);
  if(!note){
    throw {
      type: "not_found",
      message: "Note does not belong or doesn't exist for this user",
    }
  }
  return note;
}

const insert = async (note: CreateNoteData) => {
  await titleIsAvailable(note.title, note.user_id);
  note.content = cryptr.encrypt(note.content);
  await notesRepository.insert(note);
}

const getOne = async (id: number, user_id: number) => {
  const note = await findNoteForUser(id, user_id);
  note.content = cryptr.decrypt(note.content);
  return note;
}

const getAll = async (user_id: number) => {
  const notes = await notesRepository.getNotesByUser(user_id);
  notes.forEach((note) => {
    note.content = cryptr.decrypt(note.content);
  });
  return notes;
}

const deleteOne = async (id: number, user_id: number) => {
  const note = await findNoteForUser(id, user_id);
  await notesRepository.deleteNote(note.id);
}


export const notesService = {
  insert,
  getOne,
  getAll,
  deleteOne
};