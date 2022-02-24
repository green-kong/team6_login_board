const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js')


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
    let { page } = req.query; // 다 스트링으로 받아짐
    // page를 숫자로 바꾸는걸 해야함
    page = Number(page)
    const conn = await pool.getConnection();
    try {
        const sql = `SELECT * FROM user LIMIT ${(page - 1) * 10},10`;
        const [result] = await conn.query(sql);
        res.render('admin/user.html', { result });
        console.log(result);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

// get useredit 부분 아직 수정
exports.GetUserEdit = async (req, res) => {
    let { page } = req.query;
    page = Number(page)
    const conn = await pool.getConnection();
    try {
        const sql = `SELECT * FROM user LIMIT ${(page - 1) * 10},10`;
        const [result] = await conn.query(sql);
        res.render('admin/userEdit.html', { result });
        console.log(result);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

// useredit 정보수정 후 post
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
    res.send(alertmove('/user/edit', '회원정보 수정이 완료되었습니다.'));
}

exports.GetBoard = (req, res) => {
    res.render('admin/board.html');
};

exports.PostBoard = async (req, res) => {

};