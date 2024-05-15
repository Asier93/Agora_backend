import express from "express";
import { login, register } from "../Controllers/Auth.controller.js";
const router = express.Router()

router.post('/', register)

// Validarlos
// Coger datos
// Guardarlos
// OK usario creado guardado

router.post('/login', login)
// router.get('/jorge', (req, res) => {
//     res.json({message: 'jorge'})
// })



export default router