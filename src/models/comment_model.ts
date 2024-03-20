import mongoose from "mongoose";

export interface IComment{
  item_id: string,
  user_id: string,
  comment: string,
}

const commentSchema = new mongoose.Schema<IComment>({
  item_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

export default mongoose.model<IComment>("Comment", commentSchema);
