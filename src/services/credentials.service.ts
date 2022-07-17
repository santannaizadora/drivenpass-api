import { Credential } from "@prisma/client";
import { credentialRepository } from "../repositories/credentials.repository.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

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
    const hashedPassword = cryptr.encrypt(data.password);
    await credentialRepository.insert({
        ...data,
        password: hashedPassword,
    });
}

const findOne = async (id: number, user_id: number) => {
    const credential = await findCredentialForUser(user_id, id);
    credential.password = cryptr.decrypt(credential.password);
    return credential;
}

const findAll = async (user_id: number) => {
    const credentials = await credentialRepository.findUserCredentials(user_id);
    credentials.forEach((credential) => {
        credential.password = cryptr.decrypt(credential.password);
    });
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