import gameSchema from "../Schemas/game.schema.js";
import mongoose from "mongoose";

const Game = mongoose.model("game", gameSchema);

export default Game;
