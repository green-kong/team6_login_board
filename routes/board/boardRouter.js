const express = require('express');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const router = express.Router();

router.get('/list',(req,res)=>{
  res.render('board/list.html')
});

router.get('/write',(req,res)=>{
  res.render('board/write.html')
});

router.get('/view',(req,res)=>{
  res.render('board/view.html')
});

router.get('/edit',(req,res)=>{
  res.render('board/edit.html')
});

module.exports = router;//라우터 보내는 파일
