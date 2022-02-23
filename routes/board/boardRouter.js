const express = require('express');
const pool = require('../../models/db/db.js');
const router = express.Router();

router.get('/list',async (req,res)=>{
  const conn = await pool.getConnection();
  try{
    const [result] = await conn.query(`SELECT * FROM board`);
    console.log(result);
    res.render('board/list.html',{result});
} catch(err) {
    console.log(error);
}  finally{
  conn.release()
}

});

router.get('/write',(req,res)=>{ 
  const author = req.session.user.alias;
  res.render('board/write.html',{author});
});

router.post('/write',async (req,res)=>{
  const {subject,content} = req.body;
  const author = req.session.user._id;  
  const conn = await pool.getConnection();
  try{
    const [result] = await conn.query(`INSERT INTO board(subject,author,content,date) values('${subject}','${author}','${content}',curdate());`)
    console.log(result)
    res.redirect(`/board/view?_id=${result.insertId}`);
} catch(error) {
  console.log(error);
} finally{
  conn.release()
}
});

router.get('/view',(req,res)=>{
  
  res.render('board/view.html');
});

router.get('/edit',(req,res)=>{
  res.render('board/edit.html');
});

module.exports = router;//라우터 보내는 파일
