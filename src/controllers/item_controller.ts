import { ObjectId } from "mongoose";
import ItemsModel, { Iitem } from "../models/item_model";
import UserModel from "../models/user_model"
import { BaseController } from "./base_controller";
import { Request, Response } from "express";


class ItemController extends BaseController<Iitem> {
    async post(req: Request<{}, {}, {}, {user: {_id: string}}>, res: Response) {
        try {
            const item = await this.model.create(req.body);
            await UserModel.findOneAndUpdate({_id: req.query.user._id}, { $push: { items: item._id } })
            res.status(201).send(item);
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    async getUplodersOfItems(req: Request<{}, {}, {}, {items: string[]}>, res: Response) {
        try {
            const mapping = {}
            for (const item of req.query.items) {
                const result = await UserModel.findOne({items: {$in: item} })
                if (result)
                    mapping[item] = result.name
            }
            res.send(mapping);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getSelfItems(req: Request<{}, {}, {}, {user: {_id: string}}>, res: Response) {
        try {
            const user = await UserModel.findOne({_id: req.query.user._id })
            const result = await this.model.find({_id: {$in: user.items}})
            res.send(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

const itemController = new ItemController(ItemsModel);


export default itemController
