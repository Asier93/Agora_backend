import pointSchema from "../Schemas/point.schema.js";
import mongoose from "mongoose";

const Point = mongoose.model("point", pointSchema);

export default Point;
