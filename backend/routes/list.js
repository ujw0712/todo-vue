const express = require('express')
const controller = require('../controllers/listController')
const router = express.Router()

/**
 * @swagger
 *  /list/withCard:
 *    get:
 *      tags:
 *        - list
 *      summary: 리스트 전체 보기
 *      responses:
 *        200:
 *          description: 리스트 조회
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 리스트 조회 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.get('/withCard', controller.getListWithCard)

/**
 * @swagger
 *  /list:
 *    post:
 *      tags:
 *        - list
 *      summary: 리스트 등록
 *      requestBody:
 *        description: 리스트 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *               required:
 *                - title
 *      responses:
 *        200:
 *          description: 리스트 등록 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 리스트 등록 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.post('/', controller.create)

/**
 * @swagger
 *  /list/{listId}:
 *    put:
 *      tags:
 *        - list
 *      summary: 리스트 업데이트
 *      requestBody:
 *        description: 리스트 내용
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
 *               required:
 *                - listId
 *                - title
 *      responses:
 *        200:
 *          description: 리스트 업데이트 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 리스트 업데이트 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.put('/:listId', controller.update)

/**
 * @swagger
 *  /list/{listId}:
 *    delete:
 *      tags:
 *        - list
 *      summary: 리스트 삭제
 *      parameters:
 *        - in: path
 *          name: listId
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: 리스트 삭제
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 리스트 삭제 실패s
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
router.delete('/:listId', controller.remove)

/**
 * @swagger
 *  /list/move/{listId}:
 *    put:
 *      tags:
 *        - list
 *      summary: 리스트 순서 변경
 *      parameters:
 *        - in: path
 *          name: listId
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        description: 리스트 내용
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 fromSort:
 *                   type: integer
 *                 toSort:
 *                   type: integer
 *               required:
 *                - fromSort
 *                - toSort
 *      responses:
 *        200:
 *          description: 리스트 순서 변경 성공
 *          schema:
 *            properties:
 *              message:
 *                type: string
 *        401:
 *          description: 리스트 순서 변경 실패
 *          schema:
 *            properties:
 *              message:
 *                type: string
 */
 router.put('/move/:listId', controller.move)

module.exports = router