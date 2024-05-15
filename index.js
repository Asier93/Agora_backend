import { connectDB } from "./src/DataBase/connection.js"
import cors from 'cors'
import express from "express"
import 'dotenv/config'

import authRoutes from './src/Routes/Auth.routes.js'
import gameRoutes from './src/Routes/Game.routes.js'
import infoRoutes from './src/Routes/Info.routes.js'
import pointRoutes from './src/Routes/Point.routes.js'

const app = express();

connectDB()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/', gameRoutes)
app.use('/', infoRoutes)
app.use('/', pointRoutes)

app.listen(process.env.PORT_CONNECTION)
console.log("server on port", process.env.PORT_CONNECTION)