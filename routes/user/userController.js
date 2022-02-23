const { repeat } = require('nunjucks/src/lib');
const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');

exports.join = (req, res) => {
    const { user } = req.session;
    if ( user !== undefined ) {
        res.send(alertmove('/','로그인된 상태입니다.'))
    }
    res.render('user/join.html');
};

exports.joincheck = async (req, res) => {
  const { body } = req;
  const conn = await pool.getConnection();
  try {
    const sql = `INSERT INTO user
                (userid, userpw, username, alias, birthdate, email, gender, mobile, tel)
                values
                ("${body.userid}", "${body.userpw}", "${body.username}", "${body.useralias}", "${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}", "${body.useremail}", "${body.usergender}",
                "${body.usermobile1}-${body.usermobile2}-${body.usermobile3}", "${body.usertel1}-${body.usertel2}-${body.usertel3}")`;
    const sql2 = `INSERT INTO user
                (userid, userpw, username, alias, birthdate, email, gender, mobile)
                values
                ("${body.userid}", "${body.userpw}", "${body.username}", "${body.useralias}", "${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}", "${body.useremail}", "${body.usergender}",
                "${body.usermobile1}-${body.usermobile2}-${body.usermobile3}")`;
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
  res.send(
    alertmove(
      `/user/welcome?username=${body.username}`,
      '회원가입이 완료되었습니다.'
    )
  );
};

exports.login = (req, res) => {
    const { user } = req.session;
    if ( user !== undefined ) {
        res.send(alertmove('/','로그인된 상태입니다.'))
    }
    res.render('user/login.html'); 
};

exports.logincheck = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { userid, userpw } = req.body;
    const sql = `SELECT * FROM user WHERE userid = "${userid}" AND userpw = "${userpw}"`;
    let [result] = await conn.query(sql);
    if (result.length !== 0) {
        if (result[0].isActive === 1) {
            if (result[0].level === 3) {
                req.session.user = result[0];
                res.redirect('/');
            } else {
                res.send(alertmove('/admin','관리자 페이지에서 로그인 해주십시오.'))
            }
        } else {
          res.send(alertmove('/user/login', '사용이 정지된 계정입니다.'));
        }
    } else {
      res.send(alertmove('/user/login', '존재하지 않는 계정입니다.'));
    }
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

exports.logout = (req, res) => {
    const { user } = req.session;
    if ( user == undefined) {
        res.send(alertmove('/user/login','로그인이 필요한 서비스입니다.'))
    }
    req.session.destroy(() => {
        req.session;
    });
    res.send(alertmove('/', '로그아웃이 완료되었습니다.'));
};

exports.profile = async (req, res) => {
  const { user } = req.session;
  const conn = await pool.getConnection();
  try {
    const sql = `SELECT * FROM user WHERE userid = "${user.userid}"`;
    const result = await conn.query(sql);
    const mobile = {};
    mobile.mb1 = result[0][0].mobile.split('-')[0];
    mobile.mb2 = result[0][0].mobile.split('-')[1];
    mobile.mb3 = result[0][0].mobile.split('-')[2];
    const birthdate = {};
    birthdate.year = result[0][0].birthdate.getFullYear();
    birthdate.month = result[0][0].birthdate.getMonth() + 1;
    birthdate.day = result[0][0].birthdate.getDate();
    if (result[0][0].tel !== 'NULL' && result[0][0].tel !== null) {
      const tel = {};
      tel.tel1 = result[0][0].tel.split('-')[0];
      tel.tel2 = result[0][0].tel.split('-')[1];
      tel.tel3 = result[0][0].tel.split('-')[2];
      res.render('user/profile', { user, mobile, tel, birthdate });
    } else {
      res.render('user/profile', { user, mobile, birthdate });
    }
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

exports.profilecheck = async (req, res) => {
  const { body } = req;
  const conn = await pool.getConnection();
  try {
    const sql = `UPDATE user SET userpw = '${body.userpw}',
                alias = '${body.useralias}',
                email = '${body.useremail}',
                birthdate = '${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}',       
                gender = '${body.usergender}',
                mobile = '${body.usermobile1}-${body.usermobile2}-${body.usermobile3}',
                tel = '${body.usertel1}-${body.usertel2}-${body.usertel3}'
                where userid = '${body.userid}'`;
    const sql2 = `UPDATE user SET userpw = '${body.userpw}',
                alias = '${body.useralias}',
                email = '${body.useremail}',
                birthdate = '${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}',       
                gender = '${body.usergender}',
                mobile = '${body.usermobile1}-${body.usermobile2}-${body.usermobile3}',
                tel = 'NULL'
                where userid = '${body.userid}'`;
    const sql3 = `SELECT * FROM user WHERE userid = "${body.userid}"`;
    if (body.usertel1 == '' || body.usertel2 == '' || body.usertel3 == '') {
      await conn.query(sql2);
      const result = await conn.query(sql3);
      req.session.user = result[0][0];
    } else {
      await conn.query(sql);
      const result = await conn.query(sql3);
      req.session.user = result[0][0];
    }
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
  res.send(alertmove('/user/profile', '회원정보수정이 완료되었습니다. '));
};

exports.quit = async (req, res) => {
    const { user } = req.session;
    if ( user == undefined) {
        res.send(alertmove('/user/login','로그인이 필요한 서비스입니다.'))
    }
    const { body } = req;
    const conn = await pool.getConnection();
    try {
        const sql = `DELETE FROM user WHERE userid = "${body.userid}"`;
        await conn.query(sql);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
    res.send(alertmove('/user/logout', '회원탈퇴가 완료되었습니다.'));

};

exports.welcome = (req, res) => {
  const { username } = req.query;
  res.render('user/welcome.html', { username });
};
