console.log('check');
const linkedPosting = document.querySelector('#linkedPosting').value;
const replyBtn = document.querySelector('#reply_btn');
const replyList = document.querySelector('#reply_list');

const createReply = async () => {
  const replyContent = document.querySelector('#reply_content');
  if (replyContent === '') {
    alert('댓글내용을 입력해 주세요.');
    return;
  }

  const option = {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ linkedPosting, replyContent: replyContent.value }),
  };

  const response = await fetch('/reply/create', option);
  const data = await response.text();

  replyList.innerHTML = data;
  replyContent.value = '';
};

replyBtn.addEventListener('click', createReply);
