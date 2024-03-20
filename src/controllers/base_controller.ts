import { Request, Response } from "express";
import { Model } from "mongoose";

export class BaseController<ModelType>{

    model: Model<ModelType>
    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    async get(req: Request, res: Response) {
        try {
            if (req.query.name) {
                const items = await this.model.find({ name: req.query.name });
                res.send(items);
            } else {
                const items = await this.model.find();
                res.send(items);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const items = await this.model.findById(req.params.id);
            res.send(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async post(req: Request, res: Response) {
        try {
            const obj = await this.model.create(req.body);
            res.status(201).send(obj);
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    async putById(req: Request, res: Response) {
        try {
            const result = await this.model.updateOne({ _id: req.params.id }, req.body).exec();
            res.status(201).send(result);
        } catch (err) {
            res.status(406).send("Could not delete the requested obj: " + err.message)
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const result = await this.model.deleteOne({ _id: req.params.id}).exec();
            res.status(201).send(result);
        } catch (err) {
            res.status(406).send("Could not delete the requested obj: " + err.message)
        }
    }
}

const createController = <ModelType>(model: Model<ModelType>) => {
    return new BaseController<ModelType>(model);
}

export default createController;