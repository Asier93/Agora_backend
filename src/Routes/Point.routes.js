import express from "express";
import { point } from "../Controllers/Point.controller.js";
import verifyToken from '../Middlewares/Auth.middleware.js'

const router = express.Router()

router.post('/point/:game/:option', verifyToken, point)

export default router