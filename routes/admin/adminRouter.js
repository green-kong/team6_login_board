const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');


router.get('/', (req, res) => {
    res.render('admin/admin.html')
})

router.get('/user', (req, res) => {
    res.render('admin/user.html');
})


router.get('/user/edit', (req, res) => {
    res.render('admin/userEdit.html');
})

router.get('/board', (req, res) => {
    res.render('admin/board.html')
})


module.exports = router;
