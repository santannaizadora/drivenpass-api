import joi from 'joi';
import { CreateNoteData } from '../services/notes.service.js';

export const noteSchema = joi.object<CreateNoteData>({
    title: joi.string().max(50).required(),
    content: joi.string().max(1000).required(),
})