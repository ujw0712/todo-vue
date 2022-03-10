const express = require('express')
const controller = require('../controllers/chatController')
const router = express.Router()
const auth = require('../middleware/auth')


/**
 * @swagger
 *  /chat/list:
 *    get:
 *      tags:
 *        - chat
 *      summary: 대화 목록 조회
 *      responses:
 *        200:
 *          description: 대화 목록 조회
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 대화 목록 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.get('/list', controller.getList)


/**
 * @swagger
 *  /chat:
 *    post:
 *      tags:
 *        - chat
 *      summary: 대화 등록
 *      requestBody:
 *        description: 대화 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                - message
 *      responses:
 *        200:
 *          description: 대화 등록 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 대화 등록 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.post('/', auth, controller.create)

module.exports = router