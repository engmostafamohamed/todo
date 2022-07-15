const valId = require("mongoose").Types.ObjectId;
import { Request, Response, NextFunction } from "express";
const rules = {
  id: (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.params.id);
    const isValid = valId.isValid(req.params.id);
    console.log(isValid);
    if (isValid) {
      next();
      return;
    } else {
      next({
        name: "Validation Error",
        element: "params:id",
        message: "The task id is invalid id",
      });
      return;
    }
  },
  title: (req: Request, res: Response, next: NextFunction) => {
    if (req.body.title) {
      if (req.body.title.length >= 7) {
        next({
          name: "Validation Error",
          element: "body: title",
          message: "It can contain maximum 7 characters",
        });
        return;
      }
      next();
      return;
    }
    next();
    return;
  },
  doc: (req: Request, res: Response, next: NextFunction) => {
    if (req.body.desc) {
      if (req.body.desc.length >= 10) {
        next({
          name: "Validation Error",
          element: "body: desc",
          message: "It can contain maximum 10 characters",
        });
        return;
      }
      next();
      return;
    }
    next();
    return;
  },
};
export let validate = {
  getOne: [rules.id],
  addOne: [rules.title, rules.doc],
  updateOne: [rules.id, rules.title, rules.doc],
  deleteOne: [rules.id],
};
