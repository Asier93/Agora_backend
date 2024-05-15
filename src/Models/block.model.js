import blockSchema from "../Schemas/block.schema.js";
import mongoose from "mongoose";

const Block = mongoose.model("block", blockSchema);

export default Block;
