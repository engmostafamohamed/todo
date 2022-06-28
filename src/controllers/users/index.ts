import { Request, Response, NextFunction, RequestHandler } from "express";
import UserModel from "../../models/user.model";
import User from "../../models/Schema";
// import config from "../../config";

//Get /book return all user
export let getMany2 = (req: Request, res: Response) => {
  let user = User.find((err: any, users: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};
//Get /book return user with id
export let getOne2 = (req: Request, res: Response) => {
  User.findById(req.params.id, (err: any, users: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};
//put /add new user to database
export let addOne2 = (req: Request, res: Response) => {
  let user = new User(req.body);
  user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};
//delete /deleted user from database
export let deleteOne = (req: Request, res: Response) => {
  User.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Succesfully deleted the user");
    }
  });
};
//update /update user with id
export let updateOne = (req: Request, res: Response) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Succesfully update the user");
    }
  });
};
