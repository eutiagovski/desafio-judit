import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

import dotenv from 'dotenv'; 
dotenv.config();  // Load environment variables from .env file 

// initialize app
const app = express();

app.use(json());

// routes
app.post('/capture', require('./routes/capture'))
app.post('/capture/move', require('./routes/moveCapture'))
app.get('/capture/list', require('./routes/listCaptures'))

// connect to database
mongoose.connect(`mongodb+srv://judit-db-user:${process.env.DB_PASSWORD}@judit-challange.kt0ngvs.mongodb.net/?retryWrites=true&w=majority&appName=judit-challange`)
.then(() => {
    console.log('Connected to database')
});

// start server
app.listen(4000, () => {
  console.log("Server has initiated on port 4000");
});
