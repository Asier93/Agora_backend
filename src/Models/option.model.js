import optionSchema from "../Schemas/option.schema.js";
import mongoose from "mongoose";

const Option = mongoose.model("Option", optionSchema);

export default Option;
