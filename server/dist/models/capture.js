"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capture = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const captureSchema = new mongoose_1.default.Schema({
    list: {
        type: {
            type: String,
            enum: ["backlog", "discover", "lead", "deal", "archived"],
        },
        required: true,
    },
    request_id: {
        type: String,
        required: true,
    },
    lawsuit_cnj: {
        type: String,
        required: true,
    },
    process_data: {
        type: Object,
        required: true,
    },
}, { timestamps: true });
captureSchema.statics.build = (attr) => {
    return new Capture(attr);
};
const Capture = mongoose_1.default.model("Capture", captureSchema);
exports.Capture = Capture;
