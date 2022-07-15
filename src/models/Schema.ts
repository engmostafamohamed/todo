import { model, Schema } from "mongoose";

const taskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // user_id: {
    //   type: Number,
    //   required: true,
    // },
    desc: {
      type: String,
      required: true,
    },
    user_id: {
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

export default model("Task", taskSchema);
