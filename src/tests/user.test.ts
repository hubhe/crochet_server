import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;
const user = {
  email: "testUser@test.com",
  password: "1234567890",
  name: "mr.test"
}

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User tests", () => {
    beforeEach (async () => {
      await User.deleteMany({ 'email': user.email });
    })
  
    test("Test not getting all users without tokens", async () => {
        const register = await request(app).post("/auth/register").send(user);
        expect(register.statusCode).toBe(201);
      const response = await request(app)
        .get("/user")
        expect(response.statusCode).toBe(401);
    });

    test("Test getting all users with tokens", async () => {
        const register = await request(app).post("/auth/register").send(user);
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const response = await request(app)
          .get("/user")
          .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    });

    test("Test getting specific user", async () => {
        const register = await request(app).post("/auth/register").send(user);
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const response = await request(app)
          .get(`/user/${register.body.user._id}`)
          .set("Authorization", "JWT " + accessToken)
        expect(response.statusCode).toBe(200);
    });

    test("Test not getting specific user when no token is present", async () => {
        const register = await request(app).post("/auth/register").send(user);
        expect(register.statusCode).toBe(201);
        const response = await request(app)
          .get("/user")
          .set("id", register.body.user._id);
        expect(response.statusCode).toBe(401);
    });

    test("Test updating user", async () => {
        const register = await request(app).post("/auth/register").send(user);
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const response = await request(app)
          .put(`/user/${register.body.user._id}`)
          .set("Authorization", "JWT " + accessToken)
          .send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "ms.test"
          });
        expect(response.statusCode).toBe(201);
        expect(User.findOne({"name" : "ms.user"})).toBeDefined();
    });
});