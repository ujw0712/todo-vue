const express = require('express')
const controller = require('../controllers/authController')
const router = express.Router()

/**
 * @swagger
 *  /auth/signin:
 *    post:
 *      tags:
 *        - auth
 *      requestBody:
 *        description: 로그인
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: integer
 *               required:
 *                - email
 *                - password
 *      responses:
 *        200:
 *          description: 로그인 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 로그인 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.post('/signin', controller.signin)

module.exports = router
