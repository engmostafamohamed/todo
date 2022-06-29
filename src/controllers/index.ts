import { Request, Response, NextFunction, RequestHandler } from "express";
import UserModel from "../models/user.model";
import Task from "../models/Schema";
import { Types } from "../types/type";

import User from "../models/Schema";
// import { ITodo } from "./../../types/todo"
// import config from "../../config";

//Get /book return all task
export let getAllTask2 = (req: Request, res: Response) => {
  let user = User.find((err: any, users: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};
//Get /book retur
export let getAllTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTodos: Types[] = await Task.find();
    res.status(200).json({ allTodos });
  } catch (error) {
    throw error;
  }
};
//Get /book return task with id
export let getOneTask2 = (req: Request, res: Response) => {
  Task.findById(req.params.id, (err: any, tasks: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(tasks);
    }
  });
};
//Get /book return task with id
export let getOneTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTodos: Types | null = await Task.findById(req.params.id);
    res.status(200).json({ allTodos });
  } catch (error) {
    throw error;
  }
};
//put /add new task to database
export let addTask2 = (req: Request, res: Response) => {
  let task = new Task(req.body);
  task.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(task);
    }
  });
};
//put /add new task to database
export let addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<Types, "title" | "desc" | "isComplete">;

    const todo: Types = new Task({
      title: body.title,
      desc: body.desc,
      isComplete: body.isComplete,
    });

    const newTodo: Types = await todo.save();
    const allTodos: Types[] = await Task.find();

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};
//delete /deleted user from database
export let deleteOneTask = (req: Request, res: Response) => {
  User.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Succesfully deleted the user");
    }
  });
};
//delete /deleted task from database
export let deleteOneTask2 = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
  } = req;
  try {
    const deleteTodo: Types | null = await Task.findByIdAndUpdate({ _id: id });
    const allTodos: Types[] = await Task.find();
    res.status(200).json({
      message: "Successfully Deleted",
      deleteTask: deleteTodo,
      AllTask: allTodos,
    });
  } catch (error) {
    throw error;
  }
};
// update task with id
export let updateOneTask2 = (req: Request, res: Response) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Succesfully update the user");
    }
  });
};
// update task with id
export let updateOneTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const updateTodo: Types | null = await Task.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: Types[] = await Task.find();
    res.status(200).json({
      message: "Successfully updated",
      updatedTask: updateTodo,
      allTask: allTodos,
    });
  } catch (error) {
    throw error;
  }
};
