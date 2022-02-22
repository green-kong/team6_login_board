const express = require('express');
const router = express.Router();

//http://localhost:3000/admin <- 로그인하기 전 메인페이지
//router.get('/admin')
router.get('/admin', (req, res) => {
    res.render('admin')
})

// router.post('/admin', (req, res) => {  // 로그인 하려면 admin계정 정보랑 일치하는지 확인 
//     const { userid, userpw } = req.body;
//     const conn = await pool.getConnection();
//     try {
//         const sql = `SELECT * FROM user WHERE userid = admin`
//     }
// })


router.get('/admin/user')    // userlist 목록만 보이는곳 


router.get('/admin/user/edit')  // userlist목록에서 '수정'버튼을 누르면 회원정보 수정하는곳 


router.post('/admin/user/edit') // 수정내용 저장 후 어느 페이지로 갈지 내가 정하고  


router.get('/admin/board')  // 특정회원 게시글보는기능


router.post('/admin/board') // 그 특정회원 게시글 수정 삭제 권한 




// ID,PW 입력 시 POST로 보내고,
// ID,PW 일치 시 admin페이지 불일치시
// 다시 로그인 화면

module.exports = router;
