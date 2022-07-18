import { Network } from "@prisma/client";
import Cryptr from "cryptr";
import '../setup.js';

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

export type CreateNetworkData = Partial<Network>;