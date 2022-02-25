const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');

exports.listGetMid = async (req, res) => {
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
                  ORDER BY _id DESC
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
};

exports.writeGetMid = (req, res) => {
  const author = req.session.user.alias;
  res.render('board/write.html', { author });
};

exports.writePostMid = async (req, res) => {
  const { subject, content } = req.body;
  const author = req.session.user._id;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO board(subject,author,content,date) values('${subject}','${author}','${content}',curdate());`
    );
    console.log(result);
    res.send(
      alertmove(
        `/board/view?index=${result.insertId}&page=1`,
        '글 작성이 완료 되었습니다.'
      )
    );
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.viewGetMid = async (req, res) => {
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
};

exports.editGetMid = async (req, res) => {
  const { index, page } = req.query;
  console.log(index);
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `SELECT subject,content FROM board WHERE _id='${index}' `
    );
    console.log(result);

    res.render('board/edit.html', { result: result[0], index, page });
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.editPostMid = async (req, res) => {
  const { subject, content } = req.body;
  const { index, page } = req.query;
  const conn = await pool.getConnection();
  try {
    const sql = `UPDATE board SET content='${content}',subject='${subject}' WHERE _id='${index}'`;
    await conn.query(sql);

    res.send(
      alertmove(
        `/board/view?index=${index}&page=${[page]}`,
        '글 수정이 완료 되었습니다.'
      )
    );
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.deleteGetMid = async (req, res) => {
  const { index, page } = req.query;
  const conn = await pool.getConnection();
  try {
    await conn.query(`DELETE FROM board WHERE _id='${index}'`);
    res.send(alertmove(`/board/list?page=${page}`, '게시글이 삭제되었습니다.'));
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.boardLoginCheck = (req, res, next) => {
  const { user, admin } = req.session;
  if (user === undefined && admin === undefined) {
    res.send(alertmove('/user/login', '로그인이 필요한 서비스 입니다.'));
  } else {
    next();
  }
};
