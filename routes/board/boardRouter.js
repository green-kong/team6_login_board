const express = require('express');
const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');
const router = express.Router();

router.get('/list', async (req, res) => {
  const page = Number(req.query.page);
  if (page < 1) {
    res.send(alertmove('/board/list?page=1', '접근할 수 없는 페이지 입니다.'));
  } else {
    const conn = await pool.getConnection();
    try {
      const [cnt] = await conn.query('SELECT COUNT(*) as cnt from board');
      const lastPage = Math.ceil(cnt[0].cnt / 10);
      if (page > lastPage) {
        res.send(
          alertmove(
            `/board/list?page=${lastPage}`,
            '게시물이 없는 페이지 입니다. 마지막 페이지로 이동합니다.'
          )
        );
      } else {
        const sql = `SELECT board._id, subject, date, hit, alias 
                  FROM board
                  JOIN user
                  ON board.author = user._id
                  LIMIT ${(page - 1) * 10},10 `;
        const [result] = await conn.query(sql);

        result.forEach((v, i) => {
          const dateYear = v.date.getFullYear();
          const dateMonth = v.date.getMonth();
          const dateDay = v.date.getDate();
          result[i].date = `${dateYear}-${dateMonth}-${dateDay}`;
        });
        const pageCal = Math.ceil(page / 5);
        res.render('board/list.html', { result, pageCal, page });
      }
    } catch (error) {
      console.log(error);
    } finally {
      conn.release();
    }
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
  const { index, page } = req.query;
  const conn = await pool.getConnection();
  try {
    await conn.query(`UPDATE board SET hit=hit+1 WHERE _id=${index}`);
    const sql = `SELECT board._id, subject, date, hit, content, alias 
               FROM board 
               JOIN user 
               ON board.author=user._id 
               WHERE board._id='${index}'`;
    const [result] = await conn.query(sql);

    const year = result[0].date.getFullYear();
    const month = result[0].date.getMonth() + 1;
    const date = result[0].date.getDate();
    result[0].date = `${year}-${month}-${date}`;
    res.render('board/view.html', { result: result[0], page });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get('/delete', async (req, res) => {
  const { index } = req.query;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(`DELETE FROM board WHERE _id='${index}'`);
    res.send(alertmove('/board/list', '게시글이 삭제되었습니다.'));
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
});

module.exports = router; //라우터 보내는 파일
