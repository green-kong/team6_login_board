const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');

exports.join = (req,res)=>{
    res.render('user/join.html');
};

exports.joincheck = async (req,res)=>{
    const { body } = req;
    const conn = await pool.getConnection();
    try {
        const usertel = `${body.usertel1}-${body.usertel2}-${body.usertel3}`;
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
        if ( body.usertel1 === undefined || body.usertel2 === undefined || body.usertel3 === undefined) {
            await conn.query(sql2);
        } else {
            await conn.query(sql);
        };
    } catch (error){
        throw error;
    } finally {
        conn.release();
    }
    res.send(alertmove('/user/welcome','회원가입이 완료되었습니다.'));
}

exports.login = (req,res)=>{
    res.render('user/login.html')
};

exports.logincheck = (req,res)=>{
    res.send('hello world');
};

exports.logout = (req,res) => {
    req.session.destroy(() => {
        req.session;
    });
    res.send(alertmove('/','로그아웃이 완료되었습니다.'));
}

exports.profile = (req,res)=>{
    const { user } = req.session;
    res.render('/user/profile', { user });
};

exports.profilecheck = (req,res)=>{
    res.send('hello world');
};

exports.quit = (req,res)=>{
    const { user } = req.session;
    res.send(alertmove('/','회원탈퇴가 완료되었습니다.'))
};

exports.welcome = (req,res)=>{
    const { user } = req.session;
    res.render('user/welcome.html');
};
