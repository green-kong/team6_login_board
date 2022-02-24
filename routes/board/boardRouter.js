const express = require('express');
const boardController = require('./boardController.js');

const router = express.Router();

router.get('/list', boardController.listGetMid);

router.get('/view', boardController.viewGetMid);

router.get(
  '/write',
  boardController.boardLoginCheck,
  boardController.writeGetMid
);

router.post(
  '/write',
  boardController.boardLoginCheck,
  boardController.writePostMid
);

router.get(
  '/edit',
  boardController.boardLoginCheck,
  boardController.editGetMid
);

router.post(
  '/edit',
  boardController.boardLoginCheck,
  boardController.editPostMid
);

router.get(
  '/delete',
  boardController.boardLoginCheck,
  boardController.deleteGetMid
);

module.exports = router;
