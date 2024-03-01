import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import { routes } from "./routes/routes";

import dotenv from "dotenv";
dotenv.config(); //

// initialize app
const app = express();

app.use(json());

app.use("/", routes);

// connect to database
mongoose
  .connect(
    `mongodb+srv://judit-db-user:${process.env.DB_PASSWORD}@judit-challange.kt0ngvs.mongodb.net/?retryWrites=true&w=majority&appName=judit-challange`
  )
  .then(() => {
    console.log("Connected to database");
  });

// start server
app.listen(4000, () => {
  console.log("Server has initiated on https://localhost:4000");
});
