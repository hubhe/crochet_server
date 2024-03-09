import express from "express";
import itemController from "../controllers/item_controller";
import authMiddleware from "../common/auth_middleware";

const router = express.Router();


/**
* @swagger
* tags:
*   name: Items
*   description: The Items API
*/

/**
* @swagger
* components:
*   schemas:
*     Items:
*       type: object
*       required:
*         - name
*       properties:
*         name:
*           type: string
*           description: The item name.
*         price:
*           type: string
*           description: The item price, can be shown in different currencies.
*         pictures_array:
*           type: Array<string>
*           description: The item pictures that we want to display.
*       example:
*         name: 'Panda'
*         price: '10'
*/

/**
* @swagger
* /items:
*   post:
*     summary: Get all items
*     tags: [Items]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Items'
*     responses:
*       200:
*         description: The items
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Items'
*/
router.get("/", itemController.get.bind(itemController));

router.get("/:id", itemController.getById.bind(itemController));

router.post("/", authMiddleware, itemController.post.bind(itemController));

router.put("/:id", authMiddleware, itemController.putById.bind(itemController));

router.delete("/:id", authMiddleware, itemController.deleteById.bind(itemController));

export default router;
