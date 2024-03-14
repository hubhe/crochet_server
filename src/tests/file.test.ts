import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("File Tests", () => {
    test("upload file", async () => {
        const filePath = `${__dirname}/capten.webp`;
        console.log(filePath);

        try {
            const response = await request(app)
                .post(`/file/${filePath}`).attach('file', Buffer.from('file content'), filePath);
            expect(response.statusCode).toEqual(200);
            let url = response.body.url;
            console.log(url);
            url = url.replace(/^.*\/\/[^/]+/, '')
            const res = await request(app).get(url)
            expect(res.statusCode).toEqual(200);
        } catch (err) {
            console.log(err);
            expect(1).toEqual(2);
        }
    })
})
