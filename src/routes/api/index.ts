import { Router } from "express";
import * as control from "../../controllers/users/index";
import * as bodyParser from "body-parser";
const router: Router = Router();
router.use(bodyParser.json());
router.get("/getusers", control.getMany2);
router.get("/getuser/:id", control.getOne2);
router.put("/createusers", control.addOne2);
router.delete("/deleteusers/:id", control.deleteOne);
router.post("/updateusers/:id", control.updateOne);

export default router;
