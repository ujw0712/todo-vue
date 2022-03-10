const express = require('express')
const controller = require('../controllers/cardController')
const checkController = require('../controllers/checkContoller')
const commentController = require('../controllers/commentController')
const router = express.Router()
const auth = require('../middleware/auth')

/**
 * @swagger
 *  /card:
 *    post:
 *      tags:
 *        - card
 *      summary: 카드 등록
 *      requestBody:
 *        description: 카드 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 listId:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 start_date:
 *                   type: string
 *                 end_date:
 *                   type: string
 *               required:
 *                - listId
 *                - title
 *      responses:
 *        200:
 *          description: 카드 등록 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 카드 등록 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.post('/', auth, controller.create)

/**
 * @swagger
 *  /card/{cardId}:
 *    get:
 *      tags:
 *        - card
 *      summary: 카드 상세보기
 *      parameters:
 *        - in: path
 *          name: cardId
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: 카드 조회
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 카드 조회 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.get('/:cardId', controller.getDetail)

/**
 * @swagger
 *  /card/{cardId}:
 *    put:
 *      tags:
 *        - card
 *      summary: 카드 업데이트
 *      requestBody:
 *        description: 카드 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 cardId:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 start_date:
 *                   type: string
 *                 end_date:
 *                   type: string
 *               required:
 *                - cardId
 *                - title
 *      responses:
 *        200:
 *          description: 카드 업데이트 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 카드 업데이트 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.put('/:cardId', controller.update)

/**
 * @swagger
 *  /card/{cardId}:
 *    delete:
 *      tags:
 *        - card
 *      summary: 카드 삭제
 *      parameters:
 *        - in: path
 *          name: cardId
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: 카드 삭제
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 카드 삭제 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.delete('/:cardId', controller.remove)

/**
 * @swagger
 *  /card/check:
 *    post:
 *      tags:
 *        - check
 *      summary: 체크리스트 등록
 *      requestBody:
 *        description: 체크리스트 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 cardId:
 *                   type: integer
 *                 title:
 *                   type: string
 *               required:
 *                - cardId
 *                - title
 *      responses:
 *        200:
 *          description: 체크리스트 등록 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 체크리스트 등록 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.post('/check/', auth, checkController.create)

/**
 * @swagger
 *  /card/check/{checkdId}:
 *    put:
 *      tags:
 *        - check
 *      summary: 체크리스트 업데이트
 *      requestBody:
 *        description: 체크리스트 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 checkId:
 *                   type: integer
 *                 title:
 *                   type: string
 *               required:
 *                - checkId
 *                - title
 *      responses:
 *        200:
 *          description: 체크리스트 업데이트 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 체크리스트 업데이트 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.put('/check/:checkId', checkController.update)

/**
 * @swagger
 *  /card/check/{checkId}:
 *    delete:
 *      tags:
 *        - check
 *      summary: 체크리스트 삭제
 *      parameters:
 *        - in: path
 *          name: checkId
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: 체크리스트 삭제
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 체크리스트 삭제 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.delete('/check/:checkId', checkController.remove)

/**
 * @swagger
 *  /card/comment:
 *    post:
 *      tags:
 *        - comment
 *      summary: 코멘트 등록
 *      requestBody:
 *        description: 코멘트 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 cardId:
 *                   type: integer
 *                 title:
 *                   type: string
 *               required:
 *                - cardId
 *                - title
 *      responses:
 *        200:
 *          description: 코멘트 등록 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 코멘트 등록 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.post('/comment/', auth, commentController.create)

/**
 * @swagger
 *  /card/comment/{commentId}:
 *    put:
 *      tags:
 *        - comment
 *      summary: 코멘트 업데이트
 *      requestBody:
 *        description: 코멘트 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 commentId:
 *                   type: integer
 *                 title:
 *                   type: string
 *               required:
 *                - commentId
 *                - title
 *      responses:
 *        200:
 *          description: 코멘트 업데이트 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 코멘트 업데이트 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.put('/comment/:commentId', commentController.update)

/**
 * @swagger
 *  /card/comment/{commentId}:
 *    delete:
 *      tags:
 *        - comment
 *      summary: 코멘트 삭제
 *      parameters:
 *        - in: path
 *          name: commentId
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: 코멘트 삭제
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 코멘트 삭제 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.delete('/comment/:commentId', commentController.remove)


module.exports = router