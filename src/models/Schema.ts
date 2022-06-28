import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    isComplete: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
