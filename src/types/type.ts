import { Document } from "mongoose";

export interface Types extends Document {
  title: string;
  user_id: string;
  desc: string;
  isComplete: boolean;
}
