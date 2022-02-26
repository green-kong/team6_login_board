console.log('check');
const linkedPosting = document.querySelector('#linkedPosting').value;
const replyBtn = document.querySelector('#reply_btn');
const replyList = document.querySelector('.reply_list');
const replyWrap = document.querySelector('#reply_wrap');

let scrollCounter = 0;
let justCounting = true;

const createReply = async () => {
  const replyContent = document.querySelector('#reply_content');
  if (replyContent.value === '') {
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
  const newReplyCnt = document.querySelector('.reply_cnt_fr_srv').value;
  const replyCnt = document.querySelector('#reply_count');
  replyCnt.innerHTML = `${newReplyCnt}개`;
};

const readMoreReply = async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (justCounting) {
      justCounting = false;
      scrollCounter += 1;
      const url = `/reply/read?page=${scrollCounter}&index=${linkedPosting}`;
      const response = await fetch(url);
      const data = await response.text();
      const loadedReply = document.createElement('ul');
      loadedReply.classList.add('reply_list');
      loadedReply.innerHTML = data;
      replyWrap.appendChild(loadedReply);
      setTimeout(() => {
        justCounting = true;
      }, 1000);
    }
  }
};

replyBtn.addEventListener('click', createReply);

document.addEventListener('scroll', readMoreReply);
