import ItemsModel, { Iitem } from "../models/item_model";
import createController from "./base_controller";

const itemController = createController<Iitem>(ItemsModel);

export default itemController
