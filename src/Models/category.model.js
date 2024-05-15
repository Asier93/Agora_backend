import categorySchema from "../Schemas/category.schema.js";
import mongoose from "mongoose";

const Category = mongoose.model("category", categorySchema);

export default Category;
