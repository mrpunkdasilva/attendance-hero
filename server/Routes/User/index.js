const express = require( 'express' )
const router = express.Router();

const UserController = require( '../../Controllers/User/index' );


/**
 * @swagger
 * tags:
 *   name: User
 *   description: API para gerenciamento de usuários.
 */

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Obtém todos os usuários.
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: OK.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get( '/', UserController.get );

/**
 * @swagger
 * /api/user/:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profile_picture:
 *           type: string
 *           format: binary
 *         rule:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         status:
 *           type: integer
 */
router.post( '/', UserController.create );

module.exports = router;
