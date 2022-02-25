const inputList = document.querySelectorAll('input');

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

let namePass = true;
let aliasPass = true;
let numberPass = true;
let emailPass = true;

const btnActive = () => {
  if (namePass && aliasPass && numberPass && emailPass) {
    console.log('check');
    joinBtn.innerHTML = ` <button type="submit" class="join_btn" id="join_submit_btn">
                정보수정
              </button>`;
  } else {
    joinBtn.innerHTML = ` <div class="join_btn non_btn" id="join_submit_btn">
                양식이 지켜지지 않았습니다.
              </div>`;
  }
};

btnActive();

inputList.forEach((v) => {
  v.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
      alert('공백은 입력이 불가능합니다.');
    }
  });
});

const checkKor = (str) => {
  const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
};

const checkEngNum = (str) => {
  const regExp = /[a-zA-Z0-9]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
};

username.addEventListener('blur', () => {
  if (username.value === '') {
    username.style.background = 'pink';
    nameSpan.innerHTML = '이름을 입력해주세요.';
    namePass = false;
    btnActive();
    return;
  }

  if (checkEngNum(username.value)) {
    username.style.background = 'pink';
    nameSpan.innerHTML = '한글만 입력 가능합니다.';
    namePass = false;
    btnActive();
    return;
  }

  username.style.background = '';
  nameSpan.innerHTML = '';
  namePass = true;
  btnActive();
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

userEmail.addEventListener('blur', () => {
  if (userEmail.value === '') {
    userEmail.style.background = 'pink';
    emailSpan.innerHTML = '이메일을 입력해주세요.';
    emailPass = false;
    btnActive();
    return;
  }

  if (checkKor(userEmail.value)) {
    userEmail.style.background = 'pink';
    emailSpan.innerHTML = '올바른 이메일을 입력해주세요.';
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
    } else {
      e.target.style.background = '';
      e.target.style.background = '';
      birthSpan.innerHTML = '';
      mobileSpan.innerHTML = '';
      telSpan.innerHTML = '';
      numberPass = true;
      btnActive();
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

    for (let i = 0; i < numberInputList.length; i++) {
      if (i < 6 && numberInputList[i].value === '') {
        numberPass = false;
        btnActive();
        return;
      }

      if (numberInputList[1].value < 1 || numberInputList[1].value > 12) {
        numberInputList[1].style.background = 'pink';
        birthSpan.innerHTML = '올바른 날짜를 입력해주세요.';
        numberPass = false;
        btnActive();
        return;
      }

      if (numberInputList[2].value < 1 || numberInputList[2].value > 31) {
        numberInputList[2].style.background = 'pink';
        birthSpan.innerHTML = '올바른 날짜를 입력해주세요.';
        numberPass = false;
        btnActive();
        return;
      }
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
