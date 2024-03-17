import ItemsModel, { Iitem } from "../models/item_model";
import {BaseController} from "./base_controller";

const itemController = new BaseController<Iitem>(ItemsModel);

export default itemController
