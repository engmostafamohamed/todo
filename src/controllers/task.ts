import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Task from "../models/Schema";
import { Types } from "../types/type";
import jwtDecode from "jwt-decode";
const JWT_SECRET = "dcjnds";
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
  const token = req.body.token;
  jwt.verify(token, JWT_SECRET, async function (err: any, decoded: any) {
    if (err) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const { id } = decoded;
    // console.log(id);
    Task.findById(id, (err: any, post: any) => {
      if (post) {
        res.send(post);
      } else {
        res.status(404);
        res.json({ message: "task not found" });
      }
    });

    res.status(201).json({ message: "task find successfully" });
  });
  // Task.findById(req.params.id, (err: any, tasks: any) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(tasks);
  //   }
  // });
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
  const authHeader = String(req.headers["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);
    const payload = jwtDecode(token) as JwtPayload;
    console.log(payload.id);
    const task = {
      title: req.body.title,
      user_id: payload.id,
      desc: req.body.desc,
      isComplete: req.body.isComplete,
    };
    // Task.addOne(task, (err: any, task: any) => {
    //   if (err) next(err);
    //   if (task) res.status(200).json({ message: "post is added" });
    // });
  }

  interface JwtPayload {
    id: number;
    // role: string;
    // expire: number;
  }
  // another answer
  // function getToken(req: any) {
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.split(" ")[0] === "Bearer"
  //   ) {
  //     return req.headers.authorization.split(" ")[1];
  //   }
  //   return;
  // }
  // const token = getToken(req);

  // if (!token) {
  //   throw new Error("Authorization token is required");
  // }
  // jwt.verify(token, JWT_SECRET, function (err: any, decoded: any) {
  //   if (err) {
  //     throw new Error("Error : " + err);
  //   }
  //   console.log(decoded);
  //   return;
  // });

  // let task = new Task(req.body);
  // console.log(task);
  // task.save((err: any) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(task);
  //   }
  // });
};
//put /add new task to database
export let addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  interface JwtPayload {
    id: number;
    // role: string;
    // expire: number;
  }
  try {
    const body = req.body as Pick<Types, "title" | "desc" | "isComplete">;
    const token = req.body.token;
    // function getToken(req: any) {
    //   if (
    //     req.headers.authorization &&
    //     req.headers.authorization.split(" ")[0] === "Bearer"
    //   ) {
    //     return req.headers.authorization.split(" ")[1];
    //   }
    // }
    // const token = getToken(req);
    console.log(token);

    jwt.verify(token, JWT_SECRET, async function (err: any, decoded: any) {
      if (err) {
        return res.status(400).json({ error: "Invalid token" });
      }
      const { id } = decoded;
      // console.log(id);
      const todo: Types = new Task({
        title: body.title,
        user_id: id,
        desc: body.desc,
        isComplete: body.isComplete,
      });

      const newTodo: Types = await todo.save();
      const allTodos: Types[] = await Task.find();

      res
        .status(201)
        .json({ message: "task added", todo: newTodo, todos: allTodos });
    });
    // if (authHeader.startsWith("Bearer ")) {
    //   const token = authHeader.substring(7, authHeader.length);
    //   const payload = jwtDecode(token) as JwtPayload;
    //   interface JwtPayload {
    //     id: number;
    //     // role: string;
    //     // expire: number;
    //   }
    //   console.log(payload);
    //   console.log(body);
    //   const todo: Types = new Task({
    //     title: body.title,
    //     user_id: payload.id,
    //     desc: body.desc,
    //     isComplete: body.isComplete,
    //   });

    //   const newTodo: Types = await todo.save();
    //   const allTodos: Types[] = await Task.find();

    //   res
    //     .status(201)
    //     .json({ message: "task added", todo: newTodo, todos: allTodos });
    // }
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
  const token = req.body.token;
  jwt.verify(token, JWT_SECRET, async function (err: any, decoded: any) {
    if (err) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const { id } = decoded;
    // console.log(id);
    Task.deleteOne({ id }, (err: any, post: any) => {
      if (err) next(err);
      post
        ? res.status(200).json({ message: "Task is deleted" })
        : res.status(404).json({ message: "Task not found" });
    });

    res.status(201).json({ message: "task deleted successfully" });
  });
  // Task.deleteOne({ _id: req.params.id }, (err: any, post: any) => {
  //   if (err) next(err);
  //   post
  //     ? res.status(200).json({ message: "Task is deleted" })
  //     : res.status(404).json({ message: "Task not found" });
  // });
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
  const token = req.body.token;
  jwt.verify(token, JWT_SECRET, async function (err: any, decoded: any) {
    if (err) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const { id } = decoded;
    // console.log(id);
    Task.findByIdAndUpdate(id, req.body, (err: any, post: any) => {
      if (err) next(err);
      if (post) {
        res.status(200);
        res.json({ message: "task is updated" });
      } else {
        res.status(404);
        res.json({ message: "task not found" });
      }
    });

    res.status(201).json({ message: "task deleted successfully" });
  });
  // Task.findByIdAndUpdate(req.params.id, req.body, (err: any, post: any) => {
  //   // if (err) {
  //   //   res.send(err);
  //   // } else {
  //   //   res.send("Succesfully update the task");
  //   // }
  //   if (err) next(err);
  //   if (post) {
  //     res.status(200);
  //     res.json({ message: "task is updated" });
  //   } else {
  //     res.status(404);
  //     res.json({ message: "task not found" });
  //   }
  // });
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
