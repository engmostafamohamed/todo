import jwt from "jsonwebtoken";
import config from "config";
const JWT_SECRET = "dcjnds";
export const signToken = async (user: any) => {
  // const privateKey = Buffer.from(
  //   config.get<string>("SERVER_TOKEN_SECRET"),
  //   "base64"
  // ).toString("ascii");
  const token = jwt.sign(
    {
      id: user._id,
      // accessTypes: ["getTask", "addTask", "updateTask", "deleteTask"],
    },
    // { expiresIn: "30s" },
    JWT_SECRET
    // privateKey,
    // {
    //   expiresIn: `${config.get<number>("SERVER_TOKEN_EXPIRETIME")}m`,
    // }
  );

  // Send Access Token
  return token;
  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
};
