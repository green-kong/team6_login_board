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
      if (result[0].level !== 1) {
        res.send(alertmove('/admin', '접근권한이 없습니다.'));
      } else {
        res.redirect('/');
        req.session.admin = result[0]; // admin 정보 가져오기위한 저장공간이 세션
      }
    } else {
      res.send(alertmove('/admin', '존재하지 않는 계정입니다.'));
    }
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

exports.GetUser = async (req, res) => {
  let { page } = req.query;
  page = Number(page);
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT * FROM user LIMIT ${(page - 1) * 10},10`;
    const [result] = await conn.query(sql);
    const birthYear = result[0].birthdate.getFullYear(); // timestamp에서 년만 가져옴 왜 여기만 Full이지
    const birthMonth = result[0].birthdate.getMonth(); // timestamp에서 월만 가져옴
    const birthday = result[0].birthdate.getDate(); // timestamp에서 일만 가져옴
    result.forEach(function (v, i) {
      const birthYear = v.birthdate.getFullYear();
      const birthMonth = v.birthdate.getMonth();
      const birthDate = v.birthdate.getDate();

      result[i].birthdate = `${birthYear}-${birthMonth}-${birthDate}`;
    });
    res.render('admin/user.html', { result }); // result값의 바꾼 birthdate를 보내줌
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

exports.GetUserEdit = async (req, res) => {
  let { _id } = req.query;
  _id = Number(_id);
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT * FROM user WHERE _id = ${_id}`;
    const [result] = await conn.query(sql);
    const tel = {};
    tel.tel1 = result[0].tel.split('-')[0];
    tel.tel2 = result[0].tel.split('-')[1];
    tel.tel3 = result[0].tel.split('-')[2];
    const mobile = {};
    mobile.mb1 = result[0].mobile.split('-')[0];
    mobile.mb2 = result[0].mobile.split('-')[1];
    mobile.mb3 = result[0].mobile.split('-')[2];
    const birthdate = {};
    birthdate.year = result[0].birthdate.getFullYear();
    birthdate.month = result[0].birthdate.getMonth();
    birthdate.date = result[0].birthdate.getDate();
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
  res.render('admin/userEdit.html', { result, tel, mobile, birthdate });
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
            tel = 'NULL',
            WHERE userid = '${body.userid}'`;
    if (body.usertel1 == '' || body.usertel2 == '' || body.usertel3 == '') {
      await conn.query(sql2);
    } else {
      await conn.query(sql);
    }
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
  res.send(alertmove('/user', '회원정보 수정이 완료되었습니다.'));
};

exports.GetBoard = async (req, res) => {
  let { page } = req.query;
  page = Number(page);
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT board._id, subject, date , hit, author, alias
                    FROM board join user on board.author = user._id LIMIT  ${
                      (page - 1) * 10
                    },10`;
    const [result] = await conn.query(sql);
    result.forEach(function (v, i) {
      const Year = v.date.getFullYear();
      const Month = v.date.getMonth();
      const Date = v.date.getDate();
      // 어려움
      result[i].date = `${Year}-${Month}-${Date}`;
    });
    res.render('admin/board.html', { result, page });
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

// 어딘가 오류임 아직 구현 x
exports.GetBoardDelete = async (req, res) => {
  let { _id } = req.query;
  _id = Number(_id);
  const conn = await pool.getConnection();
  try {
    const sql = `DELETE FROM board WHERE _id = ${_id}`;
    await conn.query(sql);
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
  res.send(alertmove('/admin/board?page=1', '게시글이 삭제되었습니다.'));
};
