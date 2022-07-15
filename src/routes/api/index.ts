import { Router } from "express";
import * as control from "../../controllers/task";
import * as usercontrol from "../../controllers/user";
import * as bodyParser from "body-parser";
import * as Validate from "../../middlewares/validations/index";
import { auth } from "../../middlewares/auth";
// const auth = require("../../middlewares/auth");
const router: Router = Router();
router.use(bodyParser.json());
router.get("/gettasks", auth, control.getAllTask);
router.get("/gettasks2", auth, control.getAllTask2);
router.get("/gettask/:id", Validate.validate.getOne, auth, control.getOneTask);
router.get(
  "/gettask2/:id",
  Validate.validate.getOne,
  auth,
  control.getOneTask2
);
router.put("/createtask1", Validate.validate.addOne, control.addTask);
router.put("/createtask2", Validate.validate.addOne, control.addTask2);
router.delete(
  "/deleteusers/:id",
  auth,
  Validate.validate.deleteOne,
  control.deleteOneTask
);
router.delete(
  "/deleteusers2/:id",
  auth,
  Validate.validate.deleteOne,
  control.deleteOneTask2
);
router.post(
  "/updateusers/:id",
  auth,
  Validate.validate.updateOne,
  control.updateOneTask
);
router.post(
  "/updateusers2/:id",
  auth,
  Validate.validate.updateOne,
  control.updateOneTask2
);
router.post("/api/login", usercontrol.login);
router.post("/api/register", usercontrol.register);
router.post("/api/change-password", usercontrol.changePassword);
// router.get(`/api/register`, async (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

export default router;
// module.exports = router;
