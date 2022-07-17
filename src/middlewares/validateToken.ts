import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import '../setup.js';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "You are not authenticated!" });
    
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" });
        res.locals.user = user;
        next();
    });
}
