import { Router } from "express";
import { controller } from "./controllers/controller";

const router = Router();

router.get("/search", controller);

export default router;
