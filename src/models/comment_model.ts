import mongoose from "mongoose";

export interface IComment{
    game_id: string,
    user_id: string,
    comment: string,
    replays: Array<string>,
    likes: Array<number>,
}

const commentSchema = new mongoose.Schema<IComment>({
  game_id: {
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
  },
  replays: {
    type: [String]
  },
  likes: {
    type: [Number]
  },
});

export default mongoose.model<IComment>("Comment", commentSchema);
