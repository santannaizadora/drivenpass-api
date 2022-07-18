import { Card } from "@prisma/client";
import { card_types } from "@prisma/client";
import Cryptr from "cryptr";
import '../setup.js';

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

export type CreateCardData = Partial<Card>;