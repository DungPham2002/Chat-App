/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDto:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *           description: Full name of the user
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *           description: Email of the user
 *         password:
 *           type: string
 *           example: strongpassword123
 *           description: Password for the user account
 */
export class RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *           description: Email of the user
 *         password:
 *           type: string
 *           example: strongpassword123
 *           description: Password for the user account
 */
export class LoginDto {
  email: string;
  password: string;
}
