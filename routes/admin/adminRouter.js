const express = require('express');

const router = express.Router();
const adminController = require('./admincontroller.js');

router.get('/', adminController.admin);

router.post('/', adminController.adminLogin);

router.use(adminController.adminLoginCheck);

router.get(
  '/user',
  adminController.AdminUserPageCheck,
  adminController.GetUser
);

router.get(
  '/user/edit',
  adminController.adminLevelCheck,
  adminController.GetUserEdit
);

router.post('/user/edit', adminController.PostUserEdit);

router.get(
  '/board',
  adminController.AdminBoardPageCheck,
  adminController.GetBoard
);

router.get('/board/delete', adminController.GetBoardDelete);

module.exports = router;
