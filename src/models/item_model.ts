import mongoose from "mongoose";

export interface Iitem {
  _id: string;
  name: string;
  uploader: string;
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  picture: string;
  description: string;
}

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    uploader: {
      type: String
    },
    commnets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
    },
    picture: {
      type: String
    },
    description: {
      type: String
    }
  });

export default mongoose.model<Iitem>("Items", itemSchema);
