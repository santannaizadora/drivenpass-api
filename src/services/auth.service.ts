import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository.js";

export type CreateUserData = Partial<User>;

const createUser = async (email: string, password: string) => {
    const user = await userRepository.findUserByEmail(email);
    if (user) {
        throw {
            type: 'conflict',
            message: 'Email already taken',
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.insert({
        email,
        password: hashedPassword,
    });
}


export const authService = {
    createUser,
}