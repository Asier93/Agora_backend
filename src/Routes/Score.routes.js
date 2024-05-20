import express from "express";
import { getPointsByGame } from "../Controllers/Score.controller.js";
import verifyToken from '../Middlewares/Auth.middleware.js';

const router = express.Router();

router.get("/score/:game", (req, res, next) => {
    console.log(`Incoming request to /score/${req.params.game}`);
    next();
}, verifyToken, getPointsByGame);

export default router;
