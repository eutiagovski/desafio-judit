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
Object.defineProperty(exports, "__esModule", { value: true });
const capture_1 = require("../models/capture");
// 3.
// Implemente uma rota que liste todos os processos capturados, informando em que lista ele está.
// 4.
// Implemente uma rota para listar os processos presentes em uma lista, passando como parâmetro o id da lista.
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = req.query.list;
        let captureItems = [];
        if (list)
            captureItems = yield capture_1.Capture.find({ list: list });
        else
            captureItems = yield capture_1.Capture.find({});
        return res.status(200).send(captureItems);
    }
    catch (err) {
        return res
            .status(500)
            .send({ message: "We had an error" });
    }
});
