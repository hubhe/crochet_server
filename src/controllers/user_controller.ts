import UserModel, { IUser } from "../models/user_model";
import createController from "./base_controller";


const itemController = createController<IUser>(UserModel);

export default itemController