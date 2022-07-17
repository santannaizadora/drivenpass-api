import { client } from "../config/database.js";
import { CreateCredentialData } from "../services/credentials.service.js";

const findCredentialByUserAndTitle = async (userId: number, title: string) => {
    return await client.credential.findFirst({
        where: {
            user: {
                id: userId,
            },
            title,
        },
    });
}

const findCredentialByIdAndUser = async (id: number, user_id: number) => {
    return await client.credential.findFirst({
        where: {
            id,
            user: {
                id: user_id,
            },
        },
    });
}

const findUserCredentials = async ( user_id: number ) => {
    return await client.credential.findMany({
        where: {
            user: {
                id: user_id,
            },
        },
    });
}

const insert = async (credential: CreateCredentialData) => {
    await client.credential.create({
        data: {
            url: credential.url,
            username: credential.username,
            password: credential.password,
            title: credential.title,
            user: {
                connect: {
                    id: credential.user_id,
                },
            },
        },
    });
}

const delet = async (id: number) => {
    await client.credential.delete({
        where: {
            id,
        },
    });
}

export const credentialRepository = {
    findCredentialByUserAndTitle,
    insert,
    findCredentialByIdAndUser,
    findUserCredentials,
    delet,
}