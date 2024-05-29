import express from "express";
import { point, getPointsByGame } from "../Controllers/Point.controller.js";
import verifyToken from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/point/:game/:option", verifyToken, point);
router.get("/game/:game", getPointsByGame);

export default router;
