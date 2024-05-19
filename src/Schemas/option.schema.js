import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const optionSchema = new mongoose.Schema(
          {
                    name: {
                              type: String,
                              required: true,
                    },
                    description: {
                              type: String,
                              required: true,
                    },
                    blockId: {
                              type: ObjectId,
                              ref: "Block",
                              required: true,
                    },
                    categoryId: {
                              type: ObjectId,
                              ref: "Category",
                              required: true,
              },
                    cardURL: {
                              type: String,
                              required: true,
                    }
          },
          { timestamps: true }
);

export default optionSchema;
