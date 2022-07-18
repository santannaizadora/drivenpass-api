import { client } from "../config/database.js";
import { CreateCardData } from "../services/cards.service.js";

const getCardByNumber = async (number: string) =>{
    return await client.card.findUnique({
        where: {
            number
        }
    });
}

const getCardByLabelAndUser = async (label: string, user_id: number) =>{
    return await client.card.findFirst({
        where: {
            label,
            user:{
                id: user_id
            }
        }
    });
}

const getCardsByUser = async (user_id: number) =>{
    return await client.card.findMany({
        where: {
            user:{
                id: user_id
            }
        }
    });
}

const getCardByIdAndUser = async (id: number, user_id: number) =>{
    return await client.card.findFirst({
        where: {
            id,
            user:{
                id: user_id
            }
        }
    });
}

const insert = async (data: CreateCardData) =>{
    return await client.card.create({
        data: {
            number: data.number,
            expiry: data.expiry,
            cvv: data.cvv,
            password: data.password,
            is_virtual: data.is_virtual,
            type: data.type,
            label: data.label,
            user: {
                connect: {
                    id: data.user_id
                }
            }
        }
    });
}

const deleteCard = async (id: number) =>{
    await client.card.delete({
        where: {
            id
        }
    });
}

export const cardsRepository = {
    getCardByNumber,
    getCardByLabelAndUser,
    getCardsByUser,
    getCardByIdAndUser,
    insert,
    deleteCard
};