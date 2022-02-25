const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const adminController = require('./admincontroller.js')


router.get('/', adminController.admin);

router.post('/', adminController.adminLogin);

router.use(adminController.adminLoginCheck);

router.get('/user', adminController.GetUser);

router.get('/user/edit', adminController.GetUserEdit);

router.post('/user/edit', adminController.PostUserEdit);

router.get('/board', adminController.GetBoard);

router.get('/board/delete', adminController.GetBoardDelete);

module.exports = router;