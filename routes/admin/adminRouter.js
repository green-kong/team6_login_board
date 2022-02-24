const express = require('express');
const router = express.Router();
const adminController = require('./admincontroller.js')


router.get('/', adminController.admin);

router.post('/', adminController.adminLogin);

router.get('/user', adminController.GetUser);

router.get('/user/edit', adminController.GetUserEdit); // 수정해야함

router.post('/user/edit', adminController.PostUserEdit);

router.get('/board', adminController.GetBoard); // user,board join 후 전달

router.post('/board', adminController.PostBoard) // 그 특정회원 게시글 수정 삭제 권한

module.exports = router;