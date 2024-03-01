import { Request, Response } from "express";
import { Log } from "../../models/log";
import { Capture } from "../../models/capture";

// 2.
// Implemente uma rota para mudar o processo de - lista, listas existentes: backlog, discover, lead, deal, archived.
// Cada movimentação de lista deve ser logada com id da lista e data de inclusão na lista.
module.exports = async (req: Request, res: Response) => {
  try {
    const { lawsuit_cnj, new_list } = req.body;

    // check if we have necessary params in body
    if (!lawsuit_cnj || !new_list) {
      return res
        .status(400)
        .send({ message: "lawsuit_cnj and new_list is mandatory" });
    }

    // check if the params is acording to db model
    const allowedLists = ["backlog", "discover", "lead", "deal", "archived"];
    if (!allowedLists.includes(new_list)) {
      return res.status(400).send({
        message:
          "Invalid list. New list must be: backlog, discover, lead, deal or arhived",
      });
    }

    // find process in database by id
    let process = await Capture.find({ lawsuit_cnj: lawsuit_cnj });
    if (!process) {
      return res
        .status(400)
        .send({ message: "The lawsuit_cnj passed was not found in database." });
    }

    // update process list
    process[0].list = new_list;
    await process[0].save();

    // log this change
    const newLog = new Log({
      list_id: new_list,
      lawsuit_cnj: process[0].lawsuit_cnj,
      list_addition_date: new Date().toLocaleDateString(),
    });

    newLog.save();

    return res
      .status(200)
      .send({ message: "Capture was successful moved to new list" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "We had an error trying to move this process" });
  }
};
