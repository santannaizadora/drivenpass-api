import joi from 'joi';
import { CreateNetworkData } from '../services/networks.service.js';

export const networkSchema = joi.object<CreateNetworkData>({
    name: joi.string().min(3).required(),
    password: joi.string().min(4).required(),
    label: joi.string().min(3).required(),
});