import joi from 'joi';
import { CreateUserData } from '../services/auth.service.js';

export const userSchema = joi.object<CreateUserData>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
});