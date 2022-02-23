const express = require('express');
const router = express.Router();
const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js')


router.get('/', (req, res) => {
    res.render('admin/admin.html');
});

router.post('/', async (req, res) => {
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
});

router.get('/user', async (req, res) => {
    const { page } = req.query;
    const conn = await pool.getConnection();
    try {
        const sql = `SELECT * FROM user LIMIT '${(page - 1) * 10}',10`;
        const [result] = await conn.query(sql);
        res.render('admin/user.html', { result });
        console.log(result);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
});

router.get('/user/edit', async (req, res) => {
    const { page } = req.query;
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
});
// 수정내용 저장 후 어느 페이지로 갈지 내가 정하고

// 등급 계정상태 alias 메일 생년월일 성별 핸펀 전번
router.post('/user/edit', async (req, res) => {
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
});
// userlist목록에서 '수정'버튼을 누르면 회원정보 수정하는곳


router.get('/board', (req, res) => {
    res.render('admin/board.html');
}); // 특정회원 게시글보는기능?

router.post('/board') // 그 특정회원 게시글 수정 삭제 권한

module.exports = router;
