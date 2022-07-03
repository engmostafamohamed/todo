import { Request, Response, NextFunction, RequestHandler } from "express";

import Task from "../models/Schema";
import { Types } from "../types/type";

// import { ITodo } from "./../../types/todo"
// import config from "../../config";

//Get / return all task
export let getAllTask2 = (req: Request, res: Response) => {
  let task = Task.find((err: any, tasks: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(tasks);
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
export let addTask2 = (req: Request, res: Response, next: NextFunction) => {
  let task = new Task(req.body);
  task.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(task);
    }
  });
  // const task = {
  //   title: req.body.title,
  //   body: req.body.body,
  // };
  // Task.addOne(task, (err: any, task: any) => {
  //   if (err) next(err);
  //   if (task) res.status(200).json({ message: "post is added" });
  // });
};
//put /add new task to database
export let addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);

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
      .json({ message: "task added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};
//delete /deleted user from database
export let deleteOneTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Task.deleteOne({ _id: req.params.id }, (err: any, post: any) => {
    if (err) next(err);
    post
      ? res.status(200).json({ message: "Task is deleted" })
      : res.status(404).json({ message: "Task not found" });
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
export let updateOneTask2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Task.findByIdAndUpdate(req.params.id, req.body, (err: any, post: any) => {
    // if (err) {
    //   res.send(err);
    // } else {
    //   res.send("Succesfully update the task");
    // }
    if (err) next(err);
    if (post) {
      res.status(200);
      res.json({ message: "task is updated" });
    } else {
      res.status(404);
      res.json({ message: "task not found" });
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