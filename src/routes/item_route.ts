import express from "express";
const router = express.Router();
import itemController from "../controllers/item_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/", authMiddleware, itemController.get.bind(itemController));

router.get("/:id", authMiddleware, itemController.getById.bind(itemController));

router.post("/", authMiddleware, itemController.post.bind(itemController));

router.put("/:id", authMiddleware, itemController.putById.bind(itemController));

router.delete("/:id", authMiddleware, itemController.deleteById.bind(itemController));

export default router;
