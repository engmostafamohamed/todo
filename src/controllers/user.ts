import { Request, Response, NextFunction, CookieOptions } from "express";
import config from "config";
import Task from "../models/Schema";
import { Types } from "../types/type";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "dcjnds";
import AppError from "../utlis/app.Error";
import { signToken } from "../utlis/jwt";

// Only set secure to true in production

export let register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //analysis
  //script reading database
  const { username, password: plainTextPassword } = req.body;
  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small .Should be at least 5 characters",
    });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);
  //   console.log(await bcrypt.hash(password, 10));
  try {
    const user = await User.create({ username, password });
    // console.log("User create successfully", user);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    //  catch (error: any) {
    //   // return res.json({ status: "error", error: " Username already in use" });
    //   if (error.code === 11000) {
    //     return res.json({ status: "error", error: " Username already in use" });
    //   }
    // }
    // res.json({ status: "ok" });
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};
export let login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();
  console.log(user);
  if (!user) {
    return res.json({
      status: "error",
      error: "Invalid username and password",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    //the username and password combination is successfully

    // Sign Token
    const token: string = await signToken(user);
    res.status(200).json({
      status: "success",
      token,
    });
  }
  // res.json({ status: "error", error: "Invalid username and password" });

  return next(new AppError("Invalid email or password", 401));
};
export let changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const { token } = req.body;
  const { token, newpassword: plainTextPassword } = req.body;
  console.log(plainTextPassword, token, "hbjhb");
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small .Should be at least 5 characters",
    });
  }
  try {
    // const user = jwt.verify(token, JWT_SECRET);
    // console.log(user);
    // const { id } = user;
    // console.log(id);

    jwt.verify(token, JWT_SECRET, async function (err: any, decoded: any) {
      if (err) {
        return res.status(400).json({ error: "Invalid username" });
      }
      const { id } = decoded;
      console.log(id);
      const password = await bcrypt.hash(plainTextPassword, 10);
      console.log(id);
      await User.updateOne({ id }, { $set: { password: password } });
    });

    // const password = await bcrypt.hash(plainTextPassword, 10);
    // await User.updateOne({ id }, { $set: { password: password } });
    // res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: ";))" });
  }
  res.json({ status: "ok", data: token });
};
