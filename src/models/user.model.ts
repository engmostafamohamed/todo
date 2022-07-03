import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
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
  // { timestamps: true },
  { collection: "users" }
);

export default model("User", UserSchema);
