import { Card } from "@prisma/client";
import Cryptr from "cryptr";
import '../setup.js';
import { cardsRepository } from "../repositories/cards.repository.js";

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

export type CreateCardData = Partial<Card>;

const findCardByNumber = async (number: string) => {
  const card = await cardsRepository.getCardByNumber(number);
  if (card){
    throw {
      type: "conflict",
      message: "Card already exists"
    }
  }
}

const findCardForUser = async (id: number, user_id: number) => {
  const card = await cardsRepository.getCardByIdAndUser(id, user_id);
  if (!card){
    throw {
      type: "not_found",
      message: "Card does not exist or is not associated with user"
    }
  }
  return card;
}

const labelIsAvailable = async (label: string, user_id: number) => {
  const card = await cardsRepository.getCardByLabelAndUser(label, user_id);
  if (card){
    throw {
      type: "conflict",
      message: "Card label is already in use"
    }
  }
}

const createCard = async (data: CreateCardData) => {
  await findCardByNumber(data.number);
  await labelIsAvailable(data.label, data.user_id);
  data.cvv = cryptr.encrypt(data.cvv);
  data.password = cryptr.encrypt(data.password);
  await cardsRepository.insert(data);
}

const getOne = async (id: number, user_id: number) => {
  const card = await findCardForUser(id, user_id);
  card.cvv = cryptr.decrypt(card.cvv);
  card.password = cryptr.decrypt(card.password);
  return card;
}

const getAll = async (user_id: number) => {
  const cards = await cardsRepository.getCardsByUser(user_id);
  cards.forEach(card => {
    card.cvv = cryptr.decrypt(card.cvv);
    card.password = cryptr.decrypt(card.password);
  }
  );
  return cards;
}

const deleteCard = async (id: number, user_id: number) => {
  await findCardForUser(id, user_id);
  await cardsRepository.deleteCard(id);
}


export const cardsService = {
  createCard,
  getOne,
  getAll,
  deleteCard
};