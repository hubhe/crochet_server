import mongoose from "mongoose";

export interface Iitem {
  _id: string;
  name: string;
  price: string;
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  pictures_array: Array<string>;
  how_many_bought: number,
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
    pictures_array: {
      type: [String]
    },
    how_many_bought: {
      type: Number
    }
  });

export default mongoose.model<Iitem>("Items", itemSchema);
