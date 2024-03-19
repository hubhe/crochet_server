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
*         comments:
*           type: Array<string>
*           description: All comments that are attached to the item.
*         how_many_bought:
*           type: number
*           description: Counter for bought items.
*       
*       example:
*         name: 'Panda'
*         price: '10'
*/

/**
* @swagger
* /items:
*   get:
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

router.get("/uploaders", itemController.getUplodersOfItems.bind(itemController));

/**
* @swagger
* /items/:id:
*   get:
*     summary: Get item
*     tags: [Items]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Items'
*     responses:
*       200:
*         description: The requested item
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Items'
*/
router.get("/:id", itemController.getById.bind(itemController));

/**
* @swagger
* /items:
*   post:
*     summary: Add Item
*     tags: [Items]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Items'
*     responses:
*       201:
*         description: The requested item.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Items'
*       406:
*         description: Could not save the item.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Items'
*/
router.post("/", authMiddleware, itemController.post.bind(itemController));

/**
* @swagger
* /items/:id:
*   put:
*     summary: Update Item
*     tags: [Items]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Items'
*     responses:
*       201:
*         description: The updated item.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Items'
*       406:
*         description: Could not update the item.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Items'
*/
router.put("/:id", authMiddleware, itemController.putById.bind(itemController));

/**
* @swagger
* /items/:id:
*   delete:
*     summary: Remove Item
*     tags: [Items]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Items'
*     responses:
*       201:
*         description: Item deleted
*       406:
*         description: Could not delete the item.
*/
router.delete("/:id", authMiddleware, itemController.deleteById.bind(itemController));

export default router;
