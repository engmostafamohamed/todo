import { Router } from "express";
import * as control from "../../controllers/task";
import * as usercontrol from "../../controllers/user";
import * as bodyParser from "body-parser";
import * as Validate from "../../middlewares/validations/index";
// const validate = require("../../middlewares/validations/index");
const router: Router = Router();
router.use(bodyParser.json());
router.get("/getusers", control.getAllTask);
router.get("/getusers2", control.getAllTask2);
router.get("/getuser/:id", Validate.validate.getOne, control.getOneTask);
router.get("/getuser2/:id", Validate.validate.getOne, control.getOneTask2);
router.put("/createtask1", Validate.validate.addOne, control.addTask);
router.put("/createtask2", Validate.validate.addOne, control.addTask2);
router.delete(
  "/deleteusers/:id",
  Validate.validate.deleteOne,
  control.deleteOneTask
);
router.delete(
  "/deleteusers2/:id",
  Validate.validate.deleteOne,
  control.deleteOneTask2
);
router.post(
  "/updateusers/:id",
  Validate.validate.updateOne,
  control.updateOneTask
);
router.post(
  "/updateusers2/:id",
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
