const userid = document.querySelector('#userid');
const idSpan = document.querySelector('#id_span');
const idCheckBtn = document.querySelector('#id_check_btn');

const userpw = document.querySelector('#userpw');
const userpwCheck = document.querySelector('#userpw_check');
const pwSpan = document.querySelector('#pw_span');

const idCompare = [];

let isIdCheck = false;
let idPass = false;
let namePass = false;
let aliasPass = false;
let pwPass = false;
let emailPass = false;
let birthPass = false;
let mobilePass = false;

idCheckBtn.addEventListener('click', () => {
  isIdCheck = true;
});

userid.addEventListener('blur', () => {
  idCompare.push(userid.value);

  if (idCompare[idCompare.length - 1] !== idCompare[idCompare.length - 2]) {
    isIdCheck = false;
  } else {
    isIdCheck = true;
  }

  if (userid.value === '') {
    userid.style.background = 'pink';
    idSpan.innerHTML = '아이디를 입력 해주세요.';
    idPass = false;
    isIdCheck = false;
    return;
  }

  if (isIdCheck === false) {
    userid.style.background = 'pink';
    idSpan.innerHTML = '아이디 중복체크를 해주세요.';
    idPass = false;
  } else {
    userid.style.background = '';
    idSpan.innerHTML = '';
    idPass = true;
  }
});

userpwCheck.addEventListener('blur', () => {
  if (userpw.value !== userpwCheck.value) {
    userpw.style.background = 'pink';
    userpwCheck.style.background = 'pink';
    pwSpan.innerHTML = '비밀번호가 일치하지 않습니다.';
  } else {
    userpw.style.background = '';
    userpwCheck.style.background = '';
    pwSpan.innerHTML = '';
  }
});
