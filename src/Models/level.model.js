import levelSchema from "../Schemas/level.schema.js";
import mongoose from "mongoose";

const Level = mongoose.model("level", levelSchema);

export default Level;
