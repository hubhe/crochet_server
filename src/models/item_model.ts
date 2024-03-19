import mongoose from "mongoose";

export interface Iitem {
  _id: string;
  name: string;
  imgUrl: string;
  description: string;
}

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String
    },
    description: {
      type: String
    }
  });

export default mongoose.model<Iitem>("Items", itemSchema);
