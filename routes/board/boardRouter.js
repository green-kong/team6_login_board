const express = require('express');
const pool = require('../../models/db/db.js');
const router = express.Router();

router.get('/list',async (req,res)=>{
  try{
    const conn = await pool.getConnection();
    const [result] = await conn.query(`SELECT * FROM board`);
    console.log(result);
    res.render('board/list.html',{result});
} catch(err) {
    console.log(error);
}
   
});

router.get('/write',(req,res)=>{
  res.render('board/write.html');
});

router.get('/view',(req,res)=>{
  res.render('board/view.html');
});

router.get('/edit',(req,res)=>{
  res.render('board/edit.html');
});

module.exports = router;//라우터 보내는 파일
