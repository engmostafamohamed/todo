import { Request, Response, NextFunction, RequestHandler } from "express";

import Task from "../models/Schema";
import { Types } from "../types/type";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "dcjnds";
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
    console.log("User create successfully", user);
  } catch (error) {
    return res.json({ status: "error", error: " Username already in use" });
    // if (error.code === 11000) {
    //   return res.json({ status: "error", error: " Username already in use" });
    // }
  }
  res.json({ status: "ok" });
};
export let login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "Invalid username and password",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    //the username and password combination is successfully
    const token = jwt.sign(
      { id: user._id, username: user.password },
      JWT_SECRET
    );
    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid username and password" });
};
export let changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  //   const { token, newpassword: plainTextPassword } = req.body;
  //   if (!plainTextPassword || typeof plainTextPassword !== "string") {
  //     return res.json({ status: "error", error: "Invalid password" });
  //   }
  //   if (plainTextPassword.length < 5) {
  //     return res.json({
  //       status: "error",
  //       error: "Password too small .Should be at least 5 characters",
  //     });
  //   }
  //   try {
  //     const user = jwt.verify(token, JWT_SECRET);
  //     console.log(user);
  //     const _id = user.id;
  //     const password = await bcrypt.hash(plainTextPassword, 10);
  //     await User.updateOne({ _id }, { $set: { password: password } });
  //     res.json({ status: "ok" });
  //   } catch (error) {
  //     console.log(error);
  //     res.json({ status: "error", error: ";))" });
  //   }
  res.json({ status: "ok", data: token });
};
