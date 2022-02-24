const express = require('express');
const pool = require('../../models/db/db.js');
const router = express.Router();

router.get('/list', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(`SELECT * FROM board`);
    console.log(result);
    res.render('board/list.html', { result });
  } catch (err) {
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get('/write', (req, res) => {
  const author = req.session.user.alias;
  res.render('board/write.html', { author });
});

router.post('/write', async (req, res) => {
  const { subject, content } = req.body;
  const author = req.session.user._id;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO board(subject,author,content,date) values('${subject}','${author}','${content}',curdate());`
    );
    console.log(result);
    res.redirect(`/board/view?index=${result.insertId}`);
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get('/view', async (req, res) => {
  const { index } = req.query;
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT board._id, board.subject,board.date,board.hit,board.content,user.alias 
               FROM board 
               JOIN user 
               ON board.author=user._id 
               WHERE board._id='${index}'`;
    const [result] = await conn.query(sql);

    console.log(result);

    res.render('board/view.html', { result: result[0] });
  } catch (error) {
  } finally {
    conn.release();
  }
});

router.get('/edit', async (req, res) => {
  const { index } = req.query;
  console.log(index);
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `SELECT subject,content FROM board WHERE _id='${index}' `
    );
    console.log(result);
    res.render('board/edit.html', { result: result[0], index });
  } catch (err) {
  } finally {
    conn.release();
  }
});

router.post('/edit', async (req, res) => {
  const { subject, content } = req.body;
  const { index } = req.query;
  const conn = await pool.getConnection();
  try {
    const sql = `UPDATE board SET content='${content}',subject='${subject}' WHERE _id='${index}'`;
    await conn.query(sql);

    res.redirect(`/board/view?index=${index}`);
  } catch (err) {
  } finally {
    conn.release();
  }
});

router.post('/delete', (req, res) => {
  res.render('board/delete.html');
});

module.exports = router; //라우터 보내는 파일
