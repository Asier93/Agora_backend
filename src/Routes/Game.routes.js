import express from "express";
import { newgame } from "../Controllers/Game.controller.js";
import verifyToken from '../Middlewares/Auth.middleware.js'

const router = express.Router()

router.post('/newgame', verifyToken, newgame)

export default router