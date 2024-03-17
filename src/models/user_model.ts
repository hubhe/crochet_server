import mongoose from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  imgUrl?: string;
  refreshTokens?: string[];
  comments: Array<{ type: mongoose.Schema.Types.ObjectId; ref: "comments" }>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  refreshTokens: {
    type: [String],
    required: false,
  }
});

export default mongoose.model<IUser>("User", userSchema);
