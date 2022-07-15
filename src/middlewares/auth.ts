import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = "dcjnds";
// export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //    const token = req.header('Authorization')?.replace('Bearer ', '');
    let token = req.headers.authorization?.split(" ")[1];
    // const { token } = req.body;
    console.log(token);
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
