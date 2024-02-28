import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

// importing routes
import { todoRouter } from "./routes/todo.route";

// initialize app
const app = express();

app.use(json());
app.use(todoRouter);

// connect to database
mongoose.connect(`mongodb+srv://judit-db-user:Eu0NDDxrTE4wRbrP@judit-challange.kt0ngvs.mongodb.net/?retryWrites=true&w=majority&appName=judit-challange`)
.then(() => {
    console.log('Connected to database')
});

app.listen(3000, () => {
  console.log("Server has initiated on port 3000");
});
