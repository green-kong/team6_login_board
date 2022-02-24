const express = require('express');
const userRouter = require('./user/userRouter.js');
const boardRouter = require('./board/boardRouter.js');
const adminRouter = require('./admin/adminRouter.js');

const router = express.Router();


router.use('/board', boardRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

router.get('/', (req, res) => {
  const { user } = req.session;
  if (user !== undefined) {
    res.render('index.html', { user });
  } else {
    res.render('index.html');
  }
});

module.exports = router;
