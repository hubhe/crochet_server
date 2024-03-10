import mongoose from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  imgUrl?: string;
  isAdmin?: boolean;
  refreshTokens?: string[];
  wish_list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }];
  in_cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }];
  comments: Array<{ type: mongoose.Schema.Types.ObjectId; ref: "comments" }>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
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
  },
  wish_list: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }]
  }
});

export default mongoose.model<IUser>("User", userSchema);
