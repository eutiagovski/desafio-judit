"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logSchema = new mongoose_1.default.Schema({
    list_id: {
        type: String,
        required: true,
    },
    lawsuit_cnj: {
        type: String,
        required: true,
    },
    list_addition_date: {
        type: String,
        required: true,
    },
}, { timestamps: true });
logSchema.statics.build = (attr) => {
    return new Log(attr);
};
const Log = mongoose_1.default.model("Log", logSchema);
exports.Log = Log;
