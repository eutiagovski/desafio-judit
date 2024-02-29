"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file 
// initialize app
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.post('/capture', require('./routes/capture'));
app.post('/capture/move', require('./routes/moveCapture'));
app.get('/capture/list', require('./routes/listCaptures'));
// connect to database
mongoose_1.default.connect(`mongodb+srv://judit-db-user:${process.env.DB_PASSWORD}@judit-challange.kt0ngvs.mongodb.net/?retryWrites=true&w=majority&appName=judit-challange`)
    .then(() => {
    console.log('Connected to database');
});
// start server
app.listen(4000, () => {
    console.log("Server has initiated on port 4000");
});
