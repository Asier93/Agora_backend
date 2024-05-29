import express from "express";
import { info } from "../Controllers/Info.controller.js";
import verifyToken from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router.get("/info/:game", verifyToken, info);

export default router;
