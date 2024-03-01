import { Request, Response } from "express";
import axios from "axios";
import { Log } from "../../models/log";


module.exports = async (req: Request, res: Response) => {
    const logs = await Log.find({});
    return res.status(200).send({message: 'sucesseful', data: logs});
}