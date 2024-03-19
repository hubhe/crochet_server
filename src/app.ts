import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import itemRoute from "./routes/item_route";
import authRoute from "./routes/auth_route";
import userRoute from "./routes/user_route";
import commentRoute from "./routes/comment_route";
import cors from 'cors'

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    const url = process.env.DB_URL;
    mongoose.connect(url!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        port: 21771 // Specify the port here
    } as any).then(() => {
      const app = express();
      app.use(cors())
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
      })
      app.use("/items", itemRoute);
      app.use("/auth", authRoute);
      app.use("/user", userRoute);
      app.use("/comment", commentRoute);
      app.use("/public", express.static("public"));
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
