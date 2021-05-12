const express = require('express');
const setsController = require('../controllers/setsController');

const router = express.Router();

// router.param('id', tourController.checkID);
/**
 * @swagger
 * components:
 *   schemas:
 *     Sets:
 *       type: object
 *       properties:
 *         setId:
 *           type: integer
 *           description: The set ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The set's name.
 *           example: Lego City
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewSet:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 *     Set:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/NewSet'
 */

/**
 * @swagger
 * /api/v1/sets:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of sets.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sets'
 */

/**
 * @swagger
 * /api/v1/sets:
 *   post:
 *     summary: Create a Lego sets.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSet'
 *     responses:
 *       201:
 *         ...
 */

router.route('/').get(setsController.getAllSets).post(setsController.createSet);

router
  .route('/:id')
  .get(setsController.getSets)
  .patch(setsController.updateSet)
  .delete(setsController.deleteSet);

module.exports = router;
