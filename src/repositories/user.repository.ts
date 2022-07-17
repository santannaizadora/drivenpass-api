import { client } from "../config/database.js";
import { CreateUserData } from "../services/auth.service.js";

const findUserByEmail = async (email: string) => {
    return await client.user.findUnique({
        where: {
            email,
        },
    });
}

const insert = async (user: CreateUserData) => {
    await client.user.create({
        data:{
            email: user.email,
            password: user.password,
        }
    })
}

export const userRepository = {
    findUserByEmail,
    insert,
}