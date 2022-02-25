const inputList = document.querySelectorAll('input');

const username = document.querySelector('#username');
const nameSpan = document.querySelector('#name_span');

const userAlias = document.querySelector('#useralias');
const aliasSpan = document.querySelector('#alias_span');

const userEmail = document.querySelector('#useremail');
const emailSpan = document.querySelector('#email_span');

const userBirthYear = document.querySelector('#user_birth_year');
const userBirthMonth = document.querySelector('#user_birth_month');
const userBirthDay = document.querySelector('#user_birth_day');
const birthSpan = document.querySelector('#birth_span');

const userMobile1 = document.querySelector('#usermobile1');
const userMobile2 = document.querySelector('#usermobile2');
const userMobile3 = document.querySelector('#usermobile3');
const mobileSpan = document.querySelector('#mobile_span');

const numberInput = document.querySelectorAll('.one_third_input');
console.log(numberInput);

const joinBtn = document.querySelector('#btn_container');

let namePass = true;
let aliasPass = true;
let birthYearPass = true;
let birthMonthPass = true;
let birthDayPass = true;
let mobile1Pass = true;
let emailPass = true;
let mobile2Pass = true;
let mobile3Pass = true;

const btnActive = () => {
  if (
    namePass &&
    aliasPass &&
    birthYearPass &&
    birthMonthPass &&
    birthDayPass &&
    emailPass &&
    mobile1Pass &&
    mobile2Pass &&
    mobile3Pass
  ) {
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

userBirthYear.addEventListener('blur', () => {
  console.log('check');
  const inputYear = userBirthYear.value;

  const nowYear = new Date().getFullYear();

  if (inputYear.length < 4) {
    userBirthYear.style.background = 'pink';
    birthSpan.innerHTML = '올바른 생일을 입력해주세요.';
    birthYearPass = false;
    btnActive();
    return;
  }

  if (inputYear < nowYear - 100) {
    userBirthYear.style.background = 'pink';
    birthSpan.innerHTML = '..정말요?';
    birthYearPass = false;
    btnActive();
    return;
  }

  if (inputYear > nowYear) {
    userBirthYear.style.background = 'pink';
    birthSpan.innerHTML = '..미래에서 오셨군요..?';
    birthYearPass = false;
    btnActive();
    return;
  }

  userBirthYear.style.background = '';
  birthSpan.innerHTML = '';
  birthYearPass = true;
  btnActive();
});

userBirthMonth.addEventListener('blur', () => {
  if (userBirthMonth.value < 1 || userBirthMonth.value > 12) {
    userBirthMonth.style.background = 'pink';
    birthSpan.innerHTML = '올바른 생일을 입력해주세요.';
    birthMonthPass = false;
    btnActive();
    return;
  } else {
    userBirthMonth.style.background = '';
    birthSpan.innerHTML = '';
    birthMonthPass = true;
    btnActive();
  }
});

userBirthDay.addEventListener('blur', () => {
  if (userBirthDay.value < 1 || userBirthDay.value > 31) {
    userBirthDay.style.background = 'pink';
    birthSpan.innerHTML = '올바른 생일을 입력해주세요.';
    birthDayPass = false;
    btnActive();
    return;
  } else {
    userBirthDay.style.background = '';
    birthSpan.innerHTML = '';
    birthDayPass = true;
    btnActive();
  }
});

userMobile1.addEventListener('blur', () => {
  console.log('check123');
  if (userMobile1.value.toString() !== '010') {
    userMobile1.style.background = 'pink';
    mobileSpan.innerHTML = '올바른 번호 입력해주세요.';
    mobile1Pass = false;
    btnActive();
    return;
  } else {
    userMobile1.style.background = '';
    mobileSpan.innerHTML = '';
    mobile1Pass = true;
    btnActive();
  }
});

userMobile2.addEventListener('blur', () => {
  if (userMobile2.value.length < 4) {
    userMobile2.style.background = 'pink';
    mobileSpan.innerHTML = '올바른 생일을 입력해주세요.';
    mobile2Pass = false;
    btnActive();
    return;
  } else {
    userMobile2.style.background = '';
    mobileSpan.innerHTML = '';
    mobile2Pass = true;
    btnActive();
  }
});

userMobile3.addEventListener('blur', () => {
  if (userMobile3.value.length < 4) {
    userMobile3.style.background = 'pink';
    mobileSpan.innerHTML = '올바른 생일을 입력해주세요.';
    mobile3Pass = false;
    btnActive();
    return;
  } else {
    userMobile3.style.background = '';
    mobileSpan.innerHTML = '';
    mobile3Pass = true;
    btnActive();
  }
});

numberInput.forEach((v) => {
  v.addEventListener('keypress', (e) => {
    console.log(e.key);
    if (isNaN(e.key)) {
      e.preventDefault();
      alert('숫자만 입력 가능합니다.');
    }
  });
});