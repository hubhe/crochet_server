import express from "express";
const router = express.Router();
import userController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";

/**
* @swagger
* tags:
*   name: User
*   description: The User API
*/


/**
* @swagger
* /user/:id:
*   get:
*     summary: Get user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The requested item
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.get("/:id", authMiddleware, userController.getById.bind(userController));

/**
* @swagger
* /user/:id:
*   put:
*     summary: Update user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: The updated user.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       406:
*         description: Could not update the user.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.put("/:id", authMiddleware, userController.putById.bind(userController));

export default router;