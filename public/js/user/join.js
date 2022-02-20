const inputList = document.querySelectorAll('input');

const userid = document.querySelector('#userid');
const idSpan = document.querySelector('#id_span');
const idCheckBtn = document.querySelector('#id_check_btn');

const userpw = document.querySelector('#userpw');
const userpwCheck = document.querySelector('#userpw_check');
const pwSpan = document.querySelector('#pw_span');
const pwChkSpan = document.querySelector('#pw_chk_span');

const username = document.querySelector('#username');
const nameSpan = document.querySelector('#name_span');

const userAlias = document.querySelector('#useralias');
const aliasSpan = document.querySelector('#alias_span');

const userEmail = document.querySelector('#useremail');
const emailSpan = document.querySelector('#email_span');

const numberInputList = document.querySelectorAll('.one_third_input');
const birthSpan = document.querySelector('#birth_span');
const mobileSpan = document.querySelector('#mobile_span');
const telSpan = document.querySelector('#tel_span');

const joinBtn = document.querySelector('#btn_container');

const idCompare = [];

let isIdCheck = false;
let idPass = false;
let namePass = false;
let aliasPass = false;
let pwPass = false;
let numberPass = false;
let emailPass = false;

const btnActive = () => {
  if (idPass && namePass && aliasPass && pwPass && numberPass && emailPass) {
    console.log('check');
    joinBtn.innerHTML = ` <button type="submit" class="join_btn" id="join_submit_btn">
                회원가입
              </button>`;
  } else {
    joinBtn.innerHTML = ` <div class="join_btn non_btn" id="join_submit_btn">
                양식이 지켜지지 않았습니다.
              </div>`;
  }
};

inputList.forEach((v) => {
  v.addEventListener('keypress', (e) => {
    if (e.keyCode === 32) alert('공백은 입력이 불가능합니다.');
  });
});

idCheckBtn.addEventListener('click', () => {
  isIdCheck = true;
  userid.style.background = '';
  idSpan.innerHTML = '';
  idPass = true;
  btnActive();
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
    btnActive();

    return;
  }

  if (isIdCheck === false) {
    userid.style.background = 'pink';
    idSpan.innerHTML = '아이디 중복체크를 해주세요.';
    idPass = false;
    btnActive();
    return;
  }

  userid.style.background = '';
  idSpan.innerHTML = '';
  idPass = true;
  btnActive();
});

username.addEventListener('blur', () => {
  if (username.value === '') {
    username.style.background = 'pink';
    nameSpan.innerHTML = '이름을 입력해주세요.';
    namePass = false;
    btnActive();
  } else {
    username.style.background = '';
    nameSpan.innerHTML = '';
    namePass = true;
    btnActive();
  }
});

userAlias.addEventListener('blur', () => {
  if (userAlias.value === '') {
    userAlias.style.background = 'pink';
    aliasSpan.innerHTML = '닉네임을 입력해주세요.';
    aliasPass = false;
  } else {
    userAlias.style.background = '';
    aliasSpan.innerHTML = '';
    aliasPass = true;
  }
  btnActive();
});

userpw.addEventListener('blur', () => {
  if (userpw.value === '') {
    userpw.style.background = 'pink';
    pwSpan.innerHTML = '비밀번호를 입력해주세요.';
    pwPass = false;
    btnActive();
    return;
  }

  if (userpw.value !== userpwCheck.value) {
    userpw.style.background = 'pink';
    userpwCheck.style.background = 'pink';
    pwChkSpan.innerHTML = '비밀번호가 일치하지 않습니다.';
    pwPass = false;
    btnActive();
    return;
  }

  userpw.style.background = '';
  pwSpan.innerHTML = '';
  pwPass = true;
  btnActive();
});

userpwCheck.addEventListener('blur', () => {
  if (userpw.value !== userpwCheck.value) {
    userpw.style.background = 'pink';
    userpwCheck.style.background = 'pink';
    pwChkSpan.innerHTML = '비밀번호가 일치하지 않습니다.';
    pwPass = false;
  } else {
    userpw.style.background = '';
    userpwCheck.style.background = '';
    pwChkSpan.innerHTML = '';
    pwPass = true;
  }
  btnActive();
});

userEmail.addEventListener('blur', () => {
  if (userEmail.value === '') {
    userEmail.style.background = 'pink';
    emailSpan.innerHTML = '이메일을 입력해주세요.';
    emailPass = false;
    btnActive();
    return;
  }

  const atCheck = userEmail.value.split('@');
  if (atCheck.length !== 2) {
    userEmail.style.background = 'pink';
    emailSpan.innerHTML = '올바른 이메일을 입력해주세요.';
    emailPass = false;
    btnActive();
    return;
  }

  const dotCheck = atCheck[1].split('.');
  if (dotCheck.length < 2) {
    userEmail.style.background = 'pink';
    emailSpan.innerHTML = '올바른 이메일을 입력해주세요.';
    emailPass = false;
    btnActive();
    return;
  }

  userEmail.style.background = '';
  emailSpan.innerHTML = '';
  emailPass = true;
  btnActive();
});

numberInputList.forEach((v) => {
  v.addEventListener('blur', (e) => {
    for (let i = 0; i < numberInputList.length; i++) {
      console.log(i);
      if (i < 6 && numberInputList[i].value === '') {
        console.log('check', i);
        numberPass = false;
        btnActive();
        return;
      }
    }

    const idx = [...numberInputList].indexOf(e.target);
    if (isNaN(v.value)) {
      if (idx < 3) {
        birthSpan.innerHTML = '숫자만 입력 가능 합니다.';
      } else if (idx < 6) {
        mobileSpan.innerHTML = '숫자만 입력 가능 합니다.';
      } else {
        telSpan.innerHTML = '숫자만 입력 가능 합니다.';
      }
      e.target.style.background = 'pink';
      numberPass = false;
      btnActive();
      return;
    }

    if (v.value === '') {
      if (idx < 3) {
        birthSpan.innerHTML = '생년월일을 입력해 주세요.';
        e.target.style.background = 'pink';
        numberPass = false;
      } else if (idx < 6) {
        mobileSpan.innerHTML = '핸드폰 번호를 입력해주세요.';
        e.target.style.background = 'pink';
        numberPass = false;
      }
      btnActive();
      return;
    }
    console.log('check2');
    e.target.style.background = '';
    e.target.style.background = '';
    birthSpan.innerHTML = '';
    mobileSpan.innerHTML = '';
    telSpan.innerHTML = '';
    numberPass = true;
    btnActive();
  });
});
