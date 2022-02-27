const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');

exports.listGetMid = async (req, res) => {
  const { user, admin } = req.session;
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
        if (user !== undefined) {
          res.render('board/list.html', { result, pageCal, page, user });
        } else if (admin !== undefined) {
          res.render('board/list.html', { result, pageCal, page, admin });
        } else {
          res.render('board/list.html', { result, pageCal, page });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      conn.release();
    }
  }
};

exports.writeGetMid = (req, res) => {
  const { user, admin } = req.session;
  res.render('board/write.html', { admin, user });
};

exports.writePostMid = async (req, res) => {
  const { subject, content } = req.body;
  if (subject === '') {
    res.send(alertmove('/board/write', '제목을 입력해주세요.'));
  } else {
    const author = req.session.user._id;
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO board(subject,author,content,date) values('${subject}','${author}','${content}',curdate());`
      );
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
  }
};

exports.viewGetMid = async (req, res) => {
  const { user, admin } = req.session;
  const { index, page } = req.query;
  const conn = await pool.getConnection();
  try {
    await conn.query(`UPDATE board SET hit=hit+1 WHERE _id=${index}`);
    const sql = `SELECT 
              board._id, subject, DATE_FORMAT(date,'%Y-%m-%d') AS date, hit, content, alias
              FROM board 
              JOIN user 
              ON board.author=user._id 
              WHERE board._id='${index}'`;
    const [result] = await conn.query(sql);

    const replySql = `SELECT
                      reply._id, reply.content, alias, linkedPosting, DATE_FORMAT(reply.date, '%Y-%m-%d') AS date
                      FROM reply
                      JOIN board
                      ON board._id = reply.linkedPosting
                      JOIN user
                      ON reply.author = user._id
                      WHERE linkedPosting = ${index}
                      ORDER BY reply._id DESC
                      LIMIT 5`;
    const [replyList] = await conn.query(replySql);
    const replyCntSql = `SELECT COUNT(*) AS replyCnt FROM reply WHERE linkedPosting = '${index}'`;
    const [replyCnt] = await conn.query(replyCntSql);
    res.render('board/view.html', {
      result: result[0],
      page,
      user,
      admin,
      replyList,
      replyCnt: replyCnt[0],
    });
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.editGetMid = async (req, res) => {
  const { user, admin } = req.session;
  const { index, page } = req.query;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `SELECT subject,content FROM board WHERE _id='${index}' `
    );
    res.render('board/edit.html', {
      result: result[0],
      index,
      page,
      user,
      admin,
    });
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

exports.boardUserCheck = async (req, res, next) => {
  const { user, admin } = req.session;
  const { index, page } = req.query;
  const conn = await pool.getConnection();
  const sql = `SELECT author FROM board WHERE _id=${index}`;
  const [result] = await conn.query(sql);
  if (admin !== undefined) {
    next();
  } else if (user._id !== result[0].author) {
    res.send(
      alertmove(
        `/board/view?index=${index}&page=${page}`,
        '본인이 작성한 글만 수정/삭제가 가능합니다.'
      )
    );
  } else if (user._id === result[0].author) {
    next();
  }
};
