const express = require('express');
const replyControll = require('./replyController.js');

const router = express.Router();

router.get('/read', replyControll.createReply);

router.post('/create', replyControll.createReply);

router.get('/edit', replyControll.editGetReply);

router.post('/edit', replyControll.editPostReply);

router.post('/del', replyControll.delReply);

module.exports = router;
