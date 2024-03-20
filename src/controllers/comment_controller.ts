import Comment, {IComment} from "../models/comment_model";
import { Request, Response } from 'express';
import {BaseController} from "./base_controller";

class CommentController<ModelType> extends BaseController<ModelType> {
    async getCommentsByItem(req: Request, res: Response) {
        try {
            const result = await Comment.find({"item_id": req.params.id})
            if (result.length === 0) {
                throw new RangeError;
            }
            res.send(result);
        } catch (err) {
            res.status(500).send("Could not find comments: " + err.message)
        }
    }

    async getCommentsByUser(req: Request, res: Response) {
        try {
            const result = await Comment.find({"user_id": req.params.id})
            if (result.length === 0) {
                throw new RangeError;
            }
            res.send(result);
        } catch (err) {
            res.status(500).send("Could not find comments: " + err.message)
        }
    }
}

const commentController = new CommentController<IComment>(Comment);

export default commentController