import { Request, Response, NextFunction, RequestHandler } from "express";
import UserModel from "../../models/user.model";
import User from "../../models/Schema";
// import config from "../../config";
const userModel = new UserModel();
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    console.log("22");

    res.json({
      status: "success",
      data: { ...user },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("11");
    next(error);
  }
};
export const createUser2: RequestHandler = (req, res) => {
  async(u: User): Promise<void> {
    // id: req.body.id,
    title: req.body.title,
    desc: req.body.desc,
    isComplete: req.body.isComplete,
    // createdAt: req.body.createdAt,
    // moifiedAt: req.body.modifiedAdt,
 }
  const user = new :({
    // id: req.body.id,
    title: req.body.title,
    desc: req.body.desc,
    isComplete: req.body.isComplete,
    // createdAt: req.body.createdAt,
    // moifiedAt: req.body.modifiedAdt,
  });
  user.save((err, result) => {
    if (err) {
      console.log(err);
      // res.redirect('/');
      next(err);
    } else {
      // console.log(result);
      // res.redirect('/getusers');
      res.status(200).json({
        message: "post is added",
      });
      // mongoose.disconnect();
    }
  });
};

export const getMany = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: "success",
      data: users,
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      status: "success",
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: "success",
      data: { user },
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: "success",
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
