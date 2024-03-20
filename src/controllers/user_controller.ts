import UserModel, { IUser } from "../models/user_model";
import { BaseController } from "./base_controller";
import { Request, Response } from "express";

class UserController extends BaseController<IUser> {
    async getSelf(req: Request<{}, {}, {}, {user: {_id: string}}>, res: Response) {
        try {
            const user = await this.model.findById(req.query.user._id);
            res.send({ user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

const userController = new UserController(UserModel);

export default userController