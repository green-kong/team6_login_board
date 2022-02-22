const pool = require('../../models/db/db.js');
const { alertmove } = require('../../util/alertmove.js');

exports.join = (req,res)=>{
    res.render('user/join.html');
};

exports.joincheck = async (req,res)=>{
    const { body } = req;
    const conn = await pool.getConnection();
    try {
        const usertel = "${body.usertel1}-${body.usertel2}-${body.usertel3}"
        const usermobile = "${body.usermobile1}-${body.usermobile2}-${body.usermobile3}"
        const sql = `INSERT INTO user
                (userid, userpw, username, alias, birthdate, email, gender, mobile, tel)
                values
                ("${body.userid}", "${body.userpw}", "${body.username}", "${body.useralias}", "${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}", "${body.useremail}", "${body.usergender}",
                "${body.usermobile1}-${body.usermobile2}-${body.usermobile3}", "${body.usertel1}-${body.usertel2}-${body.usertel3}")`
        const sql2 = `INSERT INTO user
                (userid, userpw, username, alias, birthdate, email, gender, mobile)
                values
                ("${body.userid}", "${body.userpw}", "${body.username}", "${body.useralias}", "${body.userBirthYear}-${body.userBirthMonth}-${body.userBirthDay}", "${body.useremail}", "${body.usergender}",
                "${body.usermobile1}-${body.usermobile2}-${body.usermobile3}")`
        if ( `${usertel}` == undefined ) {
            await conn.query(sql);
        } else {
            await conn.query(sql2);
        }
    } catch (error){
        throw error;
    } finally {
        conn.release();
    }
    res.redirect('/user/welcome');
}

exports.login = (req,res)=>{
    res.send('hello world')
};

exports.logincheck = (req,res)=>{
    res.send('hello world');
};

exports.logout = (req,res) => {
    req.session.destroy(() => {
        req.session;
    });
    res.render(alertmove('/','로그아웃이 완료되었습니다. '));
}

exports.profile = (req,res)=>{
    const { user } = req.session;
    res.render('/user/profile', { user });
};

exports.profilecheck = (req,res)=>{
    res.send('hello world');
};

exports.quit = (req,res)=>{
    res.send('hello world');
};