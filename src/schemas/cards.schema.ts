import { card_types } from '@prisma/client';
import joi from 'joi';
import { CreateCardData } from '../services/cards.service.js';

export const cardSchema = joi.object<CreateCardData>({
    number: joi.string().min(16).required(),
    expiry: joi.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).required(),
    cvv: joi.string().min(3).required(),
    password: joi.string().min(4).required(),
    is_virtual: joi.boolean().required(),
    type: joi.string().valid(card_types).required(),
})