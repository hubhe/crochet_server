import express from "express";
const router = express.Router();
import userController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/:id", authMiddleware, userController.getById.bind(userController));

router.put("/:id", authMiddleware, userController.putById.bind(userController));

export default router;