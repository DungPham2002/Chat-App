import { Request, Response } from "express";
import * as messageService from "../services/message.service";

/**
 * @swagger
 * /api/message/users:
 *   get:
 *     summary: Get users for the sidebar
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: Successfully fetched users for the sidebar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       fullName:
 *                         type: string
 *                       email:
 *                         type: string
 *       500:
 *         description: Server error
 */
export const getUserForSidebar = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = await messageService.getUserForSidebar(req.user.id);
    return res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/message/{id}:
 *   get:
 *     summary: Get messages between the current user and another user
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0987654321"
 *         description: The ID of the user to chat with
 *     responses:
 *       200:
 *         description: Successfully fetched messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   senderId:
 *                     type: string
 *                   receiverId:
 *                     type: string
 *                   text:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Server error
 */
export const getMessages = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user.id;
    const userToChatId = req.params.id;
    const data = await messageService.getMessages({ userId, userToChatId });
    return res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/message/send/{id}:
 *   post:
 *     summary: Send a message to another user
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0987654321"
 *         description: The ID of the receiver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Hello, how are you?"
 *                 description: The text of the message
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.png"
 *                 description: Optional image attached to the message
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     senderId:
 *                       type: string
 *                     receiverId:
 *                       type: string
 *                     text:
 *                       type: string
 *                     image:
 *                       type: string
 *       500:
 *         description: Server error
 */
export const sendMessage = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const { text, image } = req.body;
    const data = await messageService.sendMessage({
      senderId,
      receiverId,
      text,
      image,
    });
    res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
