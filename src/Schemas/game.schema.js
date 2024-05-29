import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const gameSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default gameSchema;
