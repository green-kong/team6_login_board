const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

// app.get('/board/list',(req,res)=>{
//     res.render('board/list.html');
//   })
  app.get('/board/list',(req,res) =>{
    res.render('board_list.html',{
      list:list
    })
  })
  
  app.get('/board/write',(req,res)=>{
    res.render('board/write.html');
  })
  
  // app.post('/board/write',(req,res)=>{
  //   res.send('board/view');
  
  // })
  
  app.post('/board/write',(req,res)=>{
    let board={...req.body}
    list.push(board)
    res.redirect('/board/list.html');
  })
  app.get('/board/view',(req,res)=>{
    res.render('board/view.html');
  
  })
  
  app.get('/board/edit',(req,res)=>{
    res.render('board/view.html');
  
  })
  
  app.post('/board/edit',(req,res)=>{
      res.send('/board/view.html');
  
  })
  
  app.post('/board/delete',(req,res)=>{
      res.send('/board/list.html');
  
  })

  module.exports = router;//라우터 보내는 파일