import { Router } from "express";
import * as control from "../../controllers/users/index";

const router: Router = Router();

router.get("/getusers", control.createUser2);
router.get("/getuser/:id", control.getOne);
router.post("/createusers", control.createUser);
router.delete("/deleteusers/:id", control.deleteOne);
router.put("/updateusers/:id", control.updateOne);

export default router;
