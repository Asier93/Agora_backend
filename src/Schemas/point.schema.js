import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const pointSchema = mongoose.Schema(
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
                              type: String,
                              required: true,
                    },
          },
          { timestamps: true }
);

export default pointSchema;
