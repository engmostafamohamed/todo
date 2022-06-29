import { Router } from "express";
import * as control from "../../controllers/users/index";
import * as bodyParser from "body-parser";
const router: Router = Router();
router.use(bodyParser.json());
router.get("/getusers", control.getAllTask);
router.get("/getusers", control.getAllTask2);
router.get("/getuser/:id", control.getOneTask);
router.get("/getuser/:id", control.getOneTask2);
router.put("/createtask1", control.addTask);
router.put("/createtask2", control.addTask2);
router.delete("/deleteusers/:id", control.deleteOneTask);
router.delete("/deleteusers/:id", control.deleteOneTask2);
router.post("/updateusers/:id", control.updateOneTask);
router.post("/updateusers/:id", control.updateOneTask2);

export default router;
