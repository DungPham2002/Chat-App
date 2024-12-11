/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateProfileDto:
 *       type: object
 *       required:
 *         - fullName
 *         - avatar
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *           description: Full name of the user
 *         avatar:
 *           type: string
 *           format: uri
 *           example: "https://example.com/avatar.jpg"
 *           description: URL of the user's avatar image
 */
export class UpdateProfileDto {
    fullName: string;
    avatar: string;
}