import { Request, Response } from "express";
import axios from "axios";

import { Capture } from "../models/capture";

// set axios global api key header
axios.defaults.headers.common["api-key"] = process.env.JUDIT_API_KEY;

// 1.
// Implemente uma rota que permita a captura de processos via CNJ.
// Todo novo processo capturado entram na primeira de 5 listas existentes, chamada backlog.
module.exports = async (req: Request, res: Response) => {
  try {
    const { lawsuit_cnj } = req.body;

    if (!lawsuit_cnj) {
      return res.status(400).send({
        message: "Please, you need to provide a lawsuit cnj for search",
      });
    }

    // check judit database
    const juditResponse = await axios.post(
      "https://requests.prod.judit.io/requests",
      {
        search: {
          search_type: "lawsuit_cnj",
          search_key: lawsuit_cnj,
        },
      }
    );

    if (!juditResponse.data.request_id) {
      return res.status(400).send({
        message: "Process not found in Judit API",
      });
    }

    // check if we already have this process in the database
    let existentProcess = await Capture.find({ lawsuit_cnj: lawsuit_cnj });
    if (existentProcess.length > 0) {
      return res
        .status(200)
        .send({ message: "This cnj already exists in our database. You can use the list method to check the process response." });
    }
    const newCapture = new Capture({
      lawsuit_cnj: lawsuit_cnj,
      request_id: juditResponse.data.request_id,
      list: "backlog",
    });

    newCapture.save();

    // wait 20 seconds and update the process captured with the result of search
    setTimeout(() => {
      axios
        .get(
          `https://requests.prod.judit.io/responses/?request_id=${juditResponse.data.request_id}`
        )
        .then(async (res: any) => {
          newCapture.process_data = res.data;
          newCapture.save();
        });
    }, 20000);
    return res
      .status(200)
      .send({ message: "Process successfully captured! Wait about 20 seconds and use the list method to check the process response." });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal server error. Try again later." });
  }
};
