import app from "../src/app.js";
import supertest from 'supertest';

describe("POST /auth/logon", () =>{
    it("given an valid user it should return 201", async () =>{
        const body = {
            email: "teste@teste.com",
            password: "senhasupersecreta"
        };
        const result = await supertest(app).post("/auth/logon").send(body);
        const status = result.status;
        expect(status).toEqual(200)
    })
    it("given an invalid user it should return 422", async () =>{
        const body = {};
        const result = await supertest(app).post("/auth/logon").send(body);
        const status = result.status;
        expect(status).toEqual(422)
    })
})

describe("POST /auth/login", () =>{
    it("given an empty body it should return 422", async () =>{
        const body = {};
        const result = await supertest(app).post("/auth/login").send(body);
        const status = result.status;
        expect(status).toEqual(422)
    })
    it("given an user that does not exist, it shuld return 404", async () =>{
        const body = {
            email: "a@teste.com",
            password: "senhasupersecreta"
        };
        const result = await supertest(app).post("/auth/login").send(body);
        const status = result.status;
        expect(status).toEqual(404)
    })
})
