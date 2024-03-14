import mongoose from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  imgUrl?: string;
  isAdmin?: boolean;
  refreshTokens?: string[];
  in_cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }];
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
  isAdmin: {
    type: Boolean,
    required: false,
  },
  refreshTokens: {
    type: [String],
    required: false,
  }
});

export default mongoose.model<IUser>("User", userSchema);
