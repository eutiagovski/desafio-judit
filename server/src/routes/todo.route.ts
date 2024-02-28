import express, { Request, Response } from "express";
import { Todo } from "../models/todo";

const router = express.Router();

router.get("/api/todo", (req, res) => {
  return res.send("the todo");
});

router.post("/api/todo", [], async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const { title, description } = req.body;
    const todo = Todo.build({ title, description });
    
    await todo.save();
    return res.status(201).send(todo);
  } catch {
    return res.send('failed');
  }
});

export { router as todoRouter };
