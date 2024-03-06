import mongoose from "mongoose";

export interface Iitem {
  name: string;
  _id: string;
  price: string;
  pictures_array: Array<string>;
}

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    price: {
      type: String,
    },
    pictures_array: [String],
  });

export default mongoose.model<Iitem>("Items", itemSchema);
