import { Request, Response } from "express";
import { Capture } from "../models/capture";

// 3.
// Implemente uma rota que liste todos os processos capturados, informando em que lista ele está.
// 4.
// Implemente uma rota para listar os processos presentes em uma lista, passando como parâmetro o id da lista.
module.exports = async (req: Request, res: Response) => {
  try {
    // check if filter is present in query
    const list = req.query.list as string;

    let captureItems = [];

    // if filter is present, get only the items filtered by params in query
    if (list) captureItems = await Capture.find({ list: list });

    // else get all items
    else captureItems = await Capture.find({});

    return res.status(200).send(captureItems);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "We had an error" });
  }
};
