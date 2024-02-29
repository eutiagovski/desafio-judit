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
const log_1 = require("../models/log");
const capture_1 = require("../models/capture");
// 2.
// Implemente uma rota para mudar o processo de - lista, listas existentes: backlog, discover, lead, deal, archived.
// Cada movimentação de lista deve ser logada com id da lista e data de inclusão na lista.
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lawsuit_cnj, newList } = req.body;
        if (!lawsuit_cnj || !newList) {
            return res
                .status(400)
                .send({ message: "lawsuit_cnj and newList is mandatory" });
        }
        const allowedLists = ["backlog", "discover", "lead", "deal", "archived"];
        if (!allowedLists.includes(newList)) {
            return res.status(400).send({
                message: "Invalid list. New list must be: backlog, discover, lead, deal or arhived",
            });
        }
        // find process in database by id
        let process = yield capture_1.Capture.find({ lawsuit_cnj: lawsuit_cnj });
        if (!process) {
            return res
                .status(400)
                .send({ message: "The lawsuit_cnj passed was not found in database." });
        }
        // update process list
        process[0].list = newList;
        yield process[0].save();
        // log this change
        const newLog = new log_1.Log({
            list_id: newList,
            lawsuit_cnj: process[0].lawsuit_cnj,
            list_addition_date: new Date().toLocaleDateString(),
        });
        newLog.save();
        return res
            .status(200)
            .send({ message: "Capture was successful moved to new list" });
    }
    catch (err) {
        return res
            .status(500)
            .send({ message: "We had an error trying to move this process" });
    }
});
