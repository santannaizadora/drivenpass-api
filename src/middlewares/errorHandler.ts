import { Request, Response, NextFunction } from "express";

type CustomError = {
    type: string;
    message: string;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    if (err.type === "not_found") {
        return res.status(404).send({
            message: err.message,
        });
    }

    if (err.type === "conflict") {
        return res.status(409).send({
            message: err.message,
        });
    }

    if (err.type === "forbidden") {
        return res.status(403).send({
            message: err.message,
        });
    }

    return res.status(500).send({
        message: "Something went wrong",
    });
};