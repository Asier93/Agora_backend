import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const pointSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: ObjectId,
      ref: "Game",
      required: true,
    },
    optionId: {
      type: ObjectId,
      ref: "Option",
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default pointSchema;
