import { Credential } from "@prisma/client";
import { credentialRepository } from "../repositories/credentials.repository.js";

export type CreateCredentialData = Partial<Credential>;

const findCredentialForUser = async (user_id: number, id: number) => {
    const credential = await credentialRepository.findCredentialByIdAndUser(
        id,
        user_id
    );

    if (!credential) {
        throw {
            type: "not_found",
            message: "credential does not belong or doesn't exist for this user",
        };
    }

    return credential;
}

const titleIsAvailable = async (title: string, user_id: number) => {
    const credential = await credentialRepository.findCredentialByUserAndTitle(
        user_id,
        title
    );
    
    if (credential) {
        throw {
            type: "conflict",
            message: "You already have a credential with this title",
        };
    }
}

const createCredential = async (data: CreateCredentialData) => {
    await titleIsAvailable(data.title, data.user_id);
    await credentialRepository.insert(data);
}

const findOne = async (id: number, user_id: number) => {
    const credential = await findCredentialForUser(user_id, id);
    return credential;
}

const findAll = async (user_id: number) => {
    const credentials = await credentialRepository.findUserCredentials(user_id);
    return credentials;
}

const deleteOne = async (id: number, user_id: number) => {
    await findCredentialForUser(user_id, id);
    await credentialRepository.delet(id);
}

export const credentialsService = {
    createCredential,
    findOne,
    findAll,
    deleteOne,
}