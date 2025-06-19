import { Router } from "express";

import { index } from "../controller/BaseController";

const router = Router();

router.get("/", index);

export default router;
