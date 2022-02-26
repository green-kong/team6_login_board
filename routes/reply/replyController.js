const pool = require('../../models/db/db.js');

exports.readReply = (req, res) => {};

exports.createReply = async (req, res) => {
  const { linkedPosting, replyContent } = req.body;
  const { admin, user } = req.session;
  let author = null;
  if (admin === undefined) {
    author = user._id;
  } else {
    author = admin._id;
  }
  const createSql = `INSERT INTO reply 
                    (content, author, linkedPosting, date)
                    VALUES
                    ('${replyContent}', '${author}', '${linkedPosting}', current_date())`;
  const readSql = `SELECT
                    reply._id, reply.content, alias, linkedPosting, DATE_FORMAT(reply.date, '%Y-%m-%d') AS date
                    FROM reply
                    JOIN board
                    ON board._id = reply.linkedPosting
                    JOIN user
                    ON reply.author = user._id
                    WHERE linkedPosting = ${linkedPosting}
                    ORDER BY reply._id DESC
                    LIMIT 5`;
  const conn = await pool.getConnection();
  try {
    await conn.query(createSql);
    const [replyList] = await conn.query(readSql);
    res.render('reply/replyList.html', { replyList });
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
};

exports.editGetReply = (req, res) => {};

exports.editPostReply = (req, res) => {};

exports.delReply = (req, res) => {};
