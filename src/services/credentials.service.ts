import { Credential } from "@prisma/client";
import { credentialRepository } from "../repositories/credentials.repository.js";

export type CreateCredentialData = Partial<Credential>;

const createCredential = async (data: CreateCredentialData) => {
    const credential = await credentialRepository.findCredentialByUserAndTitle(
        data.user_id,
        data.title
    );
    
    if (credential) {
        throw {
            type: "conflict",
            message: "You already have a credential with this title",
        };
    }

    await credentialRepository.insert(data);
}

export const credentialsService = {
    createCredential,
}