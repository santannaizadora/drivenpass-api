import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import '../setup.js';

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

const login = async (email: string, password: string) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw {
            type: 'not_found',
            message: 'User not found',
        }
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw {
            type: 'forbidden',
            message: 'Invalid password',
        }
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET);

    return { token };
}

export const authService = {
    createUser,
    login,
}