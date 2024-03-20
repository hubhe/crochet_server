import express from "express";
import commentController from "../controllers/comment_controller";
import authMiddleware from "../common/auth_middleware";

const router = express.Router();


/**
* @swagger
* tags:
*   name: Comments
*   description: The Comments API
*/

/**
* @swagger
* components:
*   schemas:
*     Comment:
*       type: object
*       required:
*         - item_id
*         - user_id
*         - comment
*       properties:
*         item_id:
*           type: string
*           description: The item id who owns the comment.
*         user_id:
*           type: string
*           description: The user id that owns the comment.
*         comment:
*           type: string
*           description:  The comment
*         replays:
*           type: Array<string>
*           description: All replays that are attached to the comment.
*         likes:
*           type: number
*           description: Counter of likes.
*       
*       example:
*         item_id: '12314'
*         user_id: '21341234'
*         comment: 'wow amazing wowowowowoow'
*/


router.post("", authMiddleware, commentController.post.bind(commentController))

/**
* @swagger
* /comments/by_user/:id:
*   get:
*     summary: Get comments by user id
*     tags: [Comments]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       500:
*         description: Did not find requested comments
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.get("/by_user/:id", commentController.getCommentsByUser.bind(commentController))

/**
* @swagger
* /comments/by_item/:id:
*   get:
*     summary: Get comments by item id
*     tags: [Comments]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       500:
*         description: Did not find requested comments
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.get("/by_item/:id", commentController.getCommentsByItem.bind(commentController))

/**
* @swagger
* /comments/:id:
*   delete:
*     summary: Delete a comment
*     tags: [Comments]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       406:
*         description: Did not delete requested comments
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.delete("/:id", authMiddleware, commentController.deleteById.bind(commentController))

/**
* @swagger
* /comments/:id:
*   put:
*     summary: Update a comment
*     tags: [Comments]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       406:
*         description: Did not delete requested comments
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.put("/:id", authMiddleware, commentController.putById.bind(commentController))

export default router;