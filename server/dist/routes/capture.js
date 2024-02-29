"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const capture2_1 = require("../models/capture2");
// set axios global api key header
axios_1.default.defaults.headers.common["api-key"] = process.env.JUDIT_API_KEY;
// 1.
// Implemente uma rota que permita a captura de processos via CNJ.
// Todo novo processo capturado entram na primeira de 5 listas existentes, chamada backlog.
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lawsuit_cnj } = req.body;
        if (!lawsuit_cnj) {
            return res.status(400).send({
                message: "Please, you need to provide a lawsuit cnj for search",
            });
        }
        // check judit database
        const juditResponse = yield axios_1.default.post("https://requests.prod.judit.io/requests", {
            search: {
                search_type: "lawsuit_cnj",
                search_key: lawsuit_cnj,
            },
        });
        if (!juditResponse.data.request_id) {
            return res.status(400).send({
                message: "Process not found in Judit API",
            });
        }
        // check if we already have this process in the database
        let existentProcess = yield capture2_1.Capture.find({ lawsuit_cnj: lawsuit_cnj });
        if (existentProcess.length > 0) {
            return res
                .status(200)
                .send({ message: "This cnj already exists in our database. You can use the list method to check the process response." });
        }
        const newCapture = new capture2_1.Capture({
            lawsuit_cnj: lawsuit_cnj,
            request_id: juditResponse.data.request_id,
            list: "backlog",
        });
        newCapture.save();
        // wait 20 seconds and update the process captured with the result of search
        setTimeout(() => {
            axios_1.default
                .get(`https://requests.prod.judit.io/responses/?request_id=${juditResponse.data.request_id}`)
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                newCapture.process_data = res.data;
                newCapture.save();
            }));
        }, 20000);
        return res
            .status(200)
            .send({ message: "Process successfully captured! Wait about 20 seconds and use the list method to check the process response." });
    }
    catch (err) {
        return res
            .status(500)
            .send({ message: "Internal server error. Try again later." });
    }
});
