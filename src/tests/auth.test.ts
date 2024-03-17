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
  await User.deleteMany({ 'email': user.email });
  await mongoose.connection.close();
});

describe("Auth tests", () => {
  beforeEach (async () => {
    await User.deleteMany({ 'email': user.email });
  })

  test("Test Register with name", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(user);
    expect(response.statusCode).toBe(201);
  });

  test("Test Register mail exists", async () => {
    const response = await request(app)
    .post("/auth/register")
    .send(user);
  expect(response.statusCode).toBe(201);

  const response2 = await request(app)
  .post("/auth/register")
  .send(user);
expect(response2.statusCode).toBe(406);
  });

  test("Test Register without password", async () => {
    const user_no_name = {
      email: "testUser@test.com",
    };
    const response = await request(app)
      .post("/auth/register")
      .send(user_no_name);
    expect(response.statusCode).toBe(400);
  });

  test("Test Register missing password and mail", async () => {
    const response = await request(app)
      .post("/auth/register").send({
        name: "mr.test"
      });
    expect(response.statusCode).toBe(400);
  });

  test("Test Login", async () => {
    const register = await request(app).post("/auth/register").send(user);
    expect(register.statusCode).toBe(201);
    const response = await request(app)
      .post("/auth/login").send(user);
    expect(response.statusCode).toBe(200);
    const accessToken = response.body.accessToken;
    expect(accessToken).toBeDefined();
  });

  test("Test forbidden access without token", async () => {
    const register = await request(app)
    .post("/auth/register")
    .send(user);
  expect(register.statusCode).toBe(201);
    const response = await request(app).get("/user");
    expect(response.statusCode).toBe(401);
  });

  test("Test access with valid token", async () => {
    const register = await request(app)
    .post("/auth/register")
    .send(user);
    expect(register.statusCode).toBe(201);
    const accessToken = register.body.accessToken;
    const response = await request(app)
      .get("/user")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test access with invalid token", async () => {
    const register = await request(app)
    .post("/auth/register")
    .send(user);
    const accessToken = register.body.accessToken;
    const response = await request(app)
      .get("/user")
      .set("Authorization", "JWT 1" + accessToken);
    expect(response.statusCode).toBe(401);
  });

  jest.setTimeout(10000);

  test("Test access after timeout of token", async () => {
    const register = await request(app)
    .post("/auth/register")
    .send(user);
    const accessToken = register.body.accessToken;
    await new Promise(resolve => setTimeout(() => resolve("done"), 5000));

    const response = await request(app)
      .get("/user")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).not.toBe(200);
  });

  test("Test refresh token", async () => {
    const register = await request(app)
    .post("/auth/register")
    .send(user);
  expect(register.statusCode).toBe(201);
  const refreshToken = register.body.refreshToken;
    const response = await request(app)
      .get("/auth/refresh")
      .set("refresh_token", refreshToken)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    const newAccessToken = response.body.accessToken;

    const response2 = await request(app)
      .get("/user")
      .set("Authorization", "JWT " + newAccessToken);
    expect(response2.statusCode).toBe(200);
  });
});
