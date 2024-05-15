import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const blockSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    levelId: {
      type: ObjectId,
      ref: "Level",
      required: true,
    },
  },

  { timestamps: true }
);

export default blockSchema;
