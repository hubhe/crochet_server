import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import Comment from "../models/comment_model";
import User from "../models/user_model";

let app: Express;

const comment = {
    item_id: "1",
    user_id: "1",
    comment: "WOW",
    replays: ["2","3"],
    likes: 1
  }

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
    await Comment.deleteOne({"item_id" : "1"});
    await User.deleteOne({"email": "testUser@test.com"});
    await mongoose.connection.close();
});

describe("Comment tests", () => {
    beforeEach (async () => {
      await Comment.deleteOne({"item_id" : "1"});
      await User.deleteOne({"email": "testUser@test.com"});
    })
  
    test("Test Adding a comment without logging in", async () => {
        const insert = await request(app).post("/comment").send(comment);
        expect(insert.statusCode).toBe(401);
    });

    test("Test Adding a comment with logging in", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                        .set("Authorization", "JWT " + accessToken)
                                        .send(comment);
        expect(insert.statusCode).toBe(201);
    });
    test("Test Adding a comment with logging in", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                        .set("Authorization", "JWT " + accessToken)
                                        .send(comment);
        expect(insert.statusCode).toBe(201);
    });

    test("Test Adding a comment with logging in", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                        .set("Authorization", "JWT " + accessToken)
                                        .send(comment);
        expect(insert.statusCode).toBe(201);
    });

    test("Test editing a comment a comment with logging in", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                            .set("Authorization", "JWT " + accessToken)
                                            .send(comment);
        expect(insert.statusCode).toBe(201);    
        const edit = await request(app).put(`/comment/${insert.body._id}`)
                                        .set("Authorization", "JWT " + accessToken)
                                        .send({
                                            item_id: "1",
                                            user_id: "1",
                                            comment: "WOW!",
                                            replays: ["2","3"],
                                            likes: 1
                                          });
        expect(edit.statusCode).toBe(201);
        const edited_comment = await Comment.findOne({"$comment": "wow"})
        expect(edited_comment.comment).toBe("WOW!")
    });

    test("Test getting comment by user id", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                            .set("Authorization", "JWT " + accessToken)
                                            .send(comment);
        expect(insert.statusCode).toBe(201);    
        const comment_by_id = await request(app).get(`/comment/by_user/${comment.user_id}`)
                                        .set("Authorization", "JWT " + accessToken);
        expect(comment_by_id.statusCode).toBe(200);
        expect(comment_by_id.body[0].item_id).toBe("1");
    });

    test("Test getting comment by item id", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                            .set("Authorization", "JWT " + accessToken)
                                            .send(comment);
        expect(insert.statusCode).toBe(201);    
        const comment_by_id = await request(app).get(`/comment/by_item/${comment.item_id}`)
                                        .set("Authorization", "JWT " + accessToken);
        expect(comment_by_id.statusCode).toBe(200);
        expect(comment_by_id.body[0].user_id).toBe("1");
    });

    test("Test no comment by either id", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                            .set("Authorization", "JWT " + accessToken)
                                            .send(comment);
        expect(insert.statusCode).toBe(201);    
        const comment_by_item_id = await request(app).get(`/comment/by_item/2`)
                                        .set("Authorization", "JWT " + accessToken);
        expect(comment_by_item_id.statusCode).toBe(500);
        const comment_by_user_id = await request(app).get(`/comment/by_user/2`)
                                        .set("Authorization", "JWT " + accessToken);
        expect(comment_by_user_id.statusCode).toBe(500);
    });

    test("Test deleting comment", async () => {
        const register = await request(app).post("/auth/register").send({
            email: "testUser@test.com",
            password: "1234567890",
            name: "mr.test"
        });
        expect(register.statusCode).toBe(201);
        const accessToken = register.body.accessToken;
        const insert = await request(app).post("/comment")
                                        .set("Authorization", "JWT " + accessToken)
                                        .send(comment);
        expect(insert.statusCode).toBe(201);

        const deletion = await request(app).delete(`/comment/${insert.body._id}`)
                                        .set("Authorization", "JWT " + accessToken);
        expect(deletion.statusCode).toBe(201);    
    });
});