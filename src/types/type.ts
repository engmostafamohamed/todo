import { Document } from "mongoose";

export interface Types extends Document {
  title: string;
  desc: string;
  isComplete: boolean;
}
