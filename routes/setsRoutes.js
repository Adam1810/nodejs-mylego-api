const express = require('express');
const setsController = require('../controllers/setsController');

const router = express.Router();

// router.param('id', tourController.checkID);

router.route('/').get(setsController.getAllSets).post(setsController.createSet);

router
  .route('/:id')
  .get(setsController.getSet)
  .patch(setsController.updateSet)
  .delete(setsController.deleteSet);

module.exports = router;
