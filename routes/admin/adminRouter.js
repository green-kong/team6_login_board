const express = require('express');
const router = express.Router();
const pool = require('../../models/db/db.js');

//http://localhost:3000/admin <- 로그인페이지
//router.get('/admin')
router.get('/', (req, res) => {
    res.render('admin/admin.html')
})

router.post('/', async (req, res) => {
    const { userid, userpw } = req.body;
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(`SELECT * FROM user WHERE userid = "${userid}"`);
        console.log(result[0].userpw);
        console.log(result);
        if (result[0].userpw === userpw) {
            if (result[0].level !== 1) {
                res.send(alertmove('/admin', '접근권한이 없습니다.'))
            } else {
                res.redirect('/')
            }
            req.session.admin = result[0] // admin 정보 가져오기위한 저장공간이 세션
            res.redirect('/') // 로그인 성공, 메인페이지로 이동
        } else {
            res.send(alertmove('/admin'), '관리자 비밀번호가 일치하지 않습니다.')
        }
        res.send(result); // 
        conn.release;
    } catch (error) {
        console.log(error);
        conn.release;
    }
    res.send()
})

// router.post('/', async (req, res) => {  // 로그인 하려면 admin계정 정보랑 일치하는지 확인 
//     const { userid, userpw } = req.body;
//     const conn = await pool.getConnection();
//     try {
//         const conn = await pool.getConnection();
//         const [result] = await conn.query(`SELECT * FROM user WHERE userid = admin`, (error, result) => {
//             if (error) return console.log(error);
//             if (result) {
//                 console.log(result)
//             }
//         })
//         res.send(result)
//         conn.release();
//         res.redirect('/')
//     } catch (error) {
//         console.log(error)
//         conn.release();
//         res.redirect('/')
//     }
// })

router.get('/user', async (req, res) => {
    const { userid, username, alias, email, tel, mobile, level, isActive } = req.body;
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(`SELECT * FROM user`);
        res.send(result)
        conn.release();
    } catch (error) {
        console.log(error)
        conn.release();
    }
});    // userlist 목록만 보이는곳 


router.get('/user/edit', async (req, res) => {

})  // userlist목록에서 '수정'버튼을 누르면 회원정보 수정하는곳 


router.post('/user/edit') // 수정내용 저장 후 어느 페이지로 갈지 내가 정하고  


router.get('/board')  // 특정회원 게시글보는기능


router.post('/board') // 그 특정회원 게시글 수정 삭제 권한 




// ID,PW 입력 시 POST로 보내고,
// ID,PW 일치 시 admin페이지 불일치시
// 다시 로그인 화면

module.exports = router;
