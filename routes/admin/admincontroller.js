const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');

exports.admin = (req, res) => {
  res.render('admin/admin.html');
};

exports.adminLogin = async (req, res) => {
  const { userid, userpw } = req.body;
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT * FROM user WHERE userid = "${userid}" AND userpw = "${userpw}"`;
    const [result] = await conn.query(sql);
    if (result.length !== 0) {
      if (result[0].level > 2) {
        res.send(alertmove('/admin', '접근권한이 없습니다.'));
      } else {
        req.session.admin = result[0];
        res.redirect('/');
      }
    } else {
      res.send(alertmove('/admin', '존재하지 않는 계정입니다.'));
    }
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.GetUser = async (req, res) => {
  const page = Number(req.query.page);
  const admin = req.session;
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT * FROM user LIMIT ${(page - 1) * 10},10`;
    const [result] = await conn.query(sql);
    result.forEach((v, i) => {
      const birthYear = v.birthdate.getFullYear();
      const birthMonth = v.birthdate.getMonth();
      const birthDate = v.birthdate.getDate();
      result[i].birthdate = `${birthYear}-${birthMonth}-${birthDate}`;
    });
    const pageCal = Math.ceil(page / 5);
    res.render('admin/user.html', { result, page, pageCal, admin });
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.GetUserEdit = async (req, res) => {
  const { _id } = req.query;

  const conn = await pool.getConnection();
  try {
    const sql = `SELECT * FROM user WHERE _id = ${_id}`;
    const [result] = await conn.query(sql);
    const tel = {};
    if (result[0].tel !== null && result[0].tel !== 'NULL') {
      // 결과값이 null이 아닐때
      tel.tel1 = result[0].tel.split('-')[0];
      tel.tel2 = result[0].tel.split('-')[1];
      tel.tel3 = result[0].tel.split('-')[2];
    }
    const mobile = {};
    mobile.mb1 = result[0].mobile.split('-')[0];
    mobile.mb2 = result[0].mobile.split('-')[1];
    mobile.mb3 = result[0].mobile.split('-')[2];
    const birthdate = {};
    birthdate.year = result[0].birthdate.getFullYear();
    birthdate.month = result[0].birthdate.getMonth();
    birthdate.date = result[0].birthdate.getDate();
    let male;

    if (result[0].gender === '남자') {
      male = 1;
    }
    res.render('admin/userEdit.html', {
      result: result[0],
      tel,
      mobile,
      birthdate,
      male,
    });
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.PostUserEdit = async (req, res) => {
  const { body } = req;
  const conn = await pool.getConnection();
  try {
    const sql = `UPDATE user SET level = '${body.level}',
            isActive = '${body.isActive}',
            alias = '${body.useralias}',
            email = '${body.useremail}',
            birthdate = '${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}',
            gender = '${body.usergender}',
            mobile = '${body.usermobile1}-${body.usermobile2}-${body.usermobile3}',
            tel = '${body.usertel1}-${body.usertel2}-${body.usertel3}'
                    WHERE userid = '${body.userid}'`;
    const sql2 = `UPDATE user SET level = '${body.level}',
            isActive = '${body.isActive}',
            alias = '${body.useralias}',
            email = '${body.useremail}',
            birthdate = '${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}',
            gender = '${body.usergender}',
            mobile = '${body.usermobile1}-${body.usermobile2}-${body.usermobile3}',
            tel = 'NULL'
            WHERE userid = '${body.userid}'`;
    if (body.usertel1 == '' || body.usertel2 == '' || body.usertel3 == '') {
      await conn.query(sql2);
    } else {
      await conn.query(sql);
    }
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
  res.send(alertmove('/admin/user?page=1', '회원정보 수정이 완료되었습니다.'));
};

exports.GetBoard = async (req, res) => {
  const page = Number(req.query.page);
  const { admin } = req.session;
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT board._id, subject, date , hit, author, alias
                 FROM board 
                 JOIN user 
                 ON board.author = user._id
                 ORDER BY _id DESC
                 LIMIT  ${(page - 1) * 10},10`;
    const [result] = await conn.query(sql);
    result.forEach((v, i) => {
      const Year = v.date.getFullYear();
      const Month = v.date.getMonth();
      const Date = v.date.getDate();
      result[i].date = `${Year}-${Month}-${Date}`;
    });
    const pageCal = Math.ceil(page / 5);
    res.render('admin/board.html', { result, page, pageCal, admin });
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

exports.GetBoardDelete = async (req, res) => {
  let { _id } = req.query;
  const conn = await pool.getConnection();
  try {
    const sql = `DELETE FROM board WHERE _id = ${_id}`;
    await conn.query(sql);
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
  res.send(alertmove('/admin/board?page=1', '게시글이 삭제되었습니다.'));
};

exports.adminLoginCheck = (req, res, next) => {
  if (req.session.admin !== undefined) {
    next();
  } else {
    res.send(alertmove('/admin', '접근권한이 없습니다.'));
  }
};

exports.AdminBoardPageCheck = async (req, res, next) => {
  const page = req.query;
  const conn = await pool.getConnection();
  try {
    const [cnt] = await conn.query('SELECT COUNT(*) as cnt from board');
    const lastPage = Math.ceil(cnt[0].cnt / 10);
    if (page > lastPage) {
      res.send(
        alertmove(
          `/admin/board?page=${lastPage}`,
          '게시물이 없는 페이지 입니다. 마지막 페이지로 이동합니다.'
        )
      );
    } else if (page < 1) {
      res.send(
        alertmove(
          '/admin/user?page=1',
          '게시물이 없는 페이지 입니다. 마지막 페이지로 이동합니다.'
        )
      );
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
};

exports.AdminUserPageCheck = async (req, res, next) => {
  const page = Number(req.query.page);
  const conn = await pool.getConnection();
  try {
    const [cnt] = await conn.query('SELECT COUNT(*) as cnt from user');
    const lastPage = Math.ceil(cnt[0].cnt / 10);
    if (page > lastPage) {
      res.send(
        alertmove(
          `/admin/user?page=${lastPage}`,
          '게시물이 없는 페이지 입니다. 마지막 페이지로 이동합니다.'
        )
      );
    } else if (page < 1) {
      res.send(
        alertmove(
          '/admin/user?page=1',
          '게시물이 없는 페이지 입니다. 마지막 페이지로 이동합니다.'
        )
      );
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
};

exports.adminLevelCheck = (req, res, next) => {
  const { admin } = req.session;
  if (admin.level === 2) {
    res.send(alertmove('/admin/user?page=1', '최고관리자만 이용가능합니다.'));
  } else {
    next();
  }
};
