import mongoose from "mongoose";

export interface Iitem {
  _id: string;
  name: string;
  price: string;
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  picture: string;
}

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String
    },
    commnets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }]
    },
    picture: {
      type: String
    },
  });

export default mongoose.model<Iitem>("Items", itemSchema);
