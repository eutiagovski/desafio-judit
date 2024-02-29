"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capture = void 0;
const mongoose_1 = require("mongoose");
const captureSchema = new mongoose_1.Schema({
    list: {
        type: String,
        enum: ["backlog", "discover", "lead", "deal", "archived"],
    },
    request_id: String,
    lawsuit_cnj: String,
    process_data: Object
}, { timestamps: true });
const Capture = (0, mongoose_1.model)("Capture", captureSchema);
exports.Capture = Capture;
