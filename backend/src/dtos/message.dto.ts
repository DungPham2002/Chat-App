/**
 * @swagger
 * components:
 *   schemas:
 *     SendMessageDto:
 *       type: object
 *       required:
 *         - receiverId
 *         - senderId
 *         - text
 *       properties:
 *         receiverId:
 *           type: string
 *           example: "1234567890"
 *           description: The ID of the user receiving the message
 *         senderId:
 *           type: string
 *           example: "0987654321"
 *           description: The ID of the user sending the message
 *         text:
 *           type: string
 *           example: "Hello, how are you?"
 *           description: The text content of the message
 *         image:
 *           type: string
 *           example: "https://example.com/image.png"
 *           description: An optional image attached to the message
 */
export class SendMessageDto {
  receiverId: string;
  senderId: string;
  text: string;
  image?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     GetMessagesDto:
 *       type: object
 *       required:
 *         - userId
 *         - userToChatId
 *       properties:
 *         userId:
 *           type: string
 *           example: "1234567890"
 *           description: The ID of the user retrieving messages
 *         userToChatId:
 *           type: string
 *           example: "0987654321"
 *           description: The ID of the user to chat with
 */
export class GetMessagesDto {
  userId: string;
  userToChatId: string;
}
