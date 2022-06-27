import { Request, Response, NextFunction, RequestHandler } from "express";
import UserModel from "../../models/user.model";
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
// export const createUser: RequestHandler = (req, res) => {
//   res.json("create");
// };

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
