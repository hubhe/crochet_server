import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import Comment from "../models/comment_model";
import Items from "../models/item_model";
import User from "../models/user_model";

let app: Express;

const item = {
    name: "testtest",
  }

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
    await Comment.deleteOne({"item_id" : "1"});
    await User.deleteOne({"email": "testUser@test.com"});
    await Items.deleteMany({"name" : "testtest"});
    await mongoose.connection.close();
});

describe("Items tests", () => {
    beforeEach (async () => {
      await Comment.deleteOne({"item_id" : "1"});
      await User.deleteOne({"email": "testUser@test.com"});
      await Items.deleteMany({"name" : "testtest"});
    })
  
    test("Test getting items while not logged in", async () => {
        Items.create(item);
        const items = await request(app).get("/items");
        expect(items.statusCode).toBe(200);
        const test_item = items.body.filter(
            (it) => it.name == "testtest"
            );
        expect(test_item[0].name).toBe("testtest");
    });

    test("Test getting a specific item while not logged in", async () => {
        const respone = await Items.create(item);
        const items = await request(app).get(`/items/${respone._id}`);
        expect(items.statusCode).toBe(200);
        expect(items.body.name).toBe("testtest");
    });

    test("Test posting an item when not logged in", async () => {
        const items = await request(app).post(`/items`).send(item);
        expect(items.statusCode).toBe(401);
    });

    test("Test posting an item when logged in", async () => {
        const register = await request(app).post("/auth/register").send(
            {
                email: "testUser@test.com",
                password: "1234567890",
                name: "mr.test"
            }
        );
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const items = await request(app).post(`/items`).set("Authorization", "JWT " + accessToken).send(item);
        expect(items.statusCode).toBe(201);
    });
});