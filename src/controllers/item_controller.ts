import { Request, Response } from "express";
import ItemsModel, { Iitem } from "../models/item_model";
import {BaseController} from "./base_controller";
import { CurrencyExchangeProvider } from "../providers/currency_exchanger"

const exchangeProvider = new CurrencyExchangeProvider(process.env.EXCHANGE_URL, process.env.EXCHANGE_KEY);

class ItemController<ModelType> extends BaseController<ModelType> {
    async get(req: Request, res: Response) {
        try {
            let items;
            if (req.query.name) {
                items = await this.model.find({ name: req.query.name });
            } else {
                items = await this.model.find();
            }

            if (process.env.EXHANGE) {
                items = await this.addExchangeRateToItems(items);
            }
            res.send(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const items = await this.model.findById(req.params.id);
            if (process.env.EXHANGE) {
                res.send(await this.addExchangeRateToItems(items));
            } else{
                res.send(items);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    private async addExchangeRateToItems(itemOrItems: ModelType | ModelType[]): Promise<ModelType | ModelType[]> {
        // TODO::Check what the client wants to show
        if (Array.isArray(itemOrItems)) {
            const items_with_exchange_rate = [];
            for (const item of itemOrItems) {
                const new_price = await exchangeProvider.getExchangeRates(process.env.BASE_CURRENCY, process.env.ADDITIONAL_CURRENCY, item['price']);
                const item_with_exchange_rate = item;
                item_with_exchange_rate['price'] = new_price;
                items_with_exchange_rate.push(item_with_exchange_rate);
            }
            return items_with_exchange_rate;
        } else {
            const new_price = await exchangeProvider.getExchangeRates(process.env.BASE_CURRENCY, process.env.ADDITIONAL_CURRENCY, itemOrItems['price']);
            const item_with_exchange_rate = itemOrItems;
            item_with_exchange_rate['price'] = new_price;

            return item_with_exchange_rate;
        }


    }

}

const itemController = new ItemController<Iitem>(ItemsModel);

export default itemController
