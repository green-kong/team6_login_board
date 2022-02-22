const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();

  router.get('/board/list',(req,res) =>{
    res.render('board_list.html',{    
    })
  })
  
  router.get('/board/write',(req,res)=>{
    res.render('board/write.html');
  })
  
  router.post('/board/write',(req,res)=>{
    let item={...req.body}
    data.push(board)
    res.redirect('/board/list.html');
  })

  router.get('/board/view',(req,res)=>{
    const index = req.query.index
    const view = list[index-1]
    res.render('view',{
      data:view,
      index:index,
    })
  })
  
  router.get('/board/edit',(req,res)=>{
    res.render('board/view.html');
  })
  
  router.post('/board/edit',(req,res)=>{
      res.send('/board/view.html');
  })
  
  router.post('/board/delete',(req,res)=>{
      res.send('/board/list.html'); 
  })

  module.exports = router;//라우터 보내는 파일