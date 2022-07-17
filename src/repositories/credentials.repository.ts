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

export const credentialRepository = {
    findCredentialByUserAndTitle,
    insert,
}