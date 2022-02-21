# 업무분담

---

## 동훈 : 팀장 / 프론트엔드 / DB관리 / Github관리

## 수환 : 백엔드 / 메인 / USER

- 회원가입
- 로그인
- 회원 탈퇴
- 회원정보 수정
- 게시판 접근권한
- 관리자페이지 접근권한
- 글 수정 / 삭제 권한

## 종남 : 백엔드 / ADMIN

- 관리자 로그인
- 사용자 등급 조정
- 사용자 계정 활성화/ 비활성화
- 게시글 삭제

## 귀현 : 백엔드 / BOARD

- 게시글 목록
- 글 작성
- 게시글 수정
- 게시글 삭제

# API 설계

---

## 메인페이지

- GET /

## user

- GET join
- POST join
  - 아이디 userid
  - 비밀번호 userpw
  - 이름 username
  - 닉네임 useralias
  - 생년월일 userBirthYear, userBirthMonth, userBirthDay
  - 이메일 useremail
  - 성별 usergender
  - 핸드폰번호 usermobile1, usermobile2, usermobile3
  - 집번호 usertel1, usertel2, usertel3
- GET login
- POST login
  - 아이디 userid
  - 비번 userpw
- GET profile
- POST profile
  - 비밀번호 userpw
  - 닉네임 useralias
  - 생년월일 userBirthYear, userBirthMonth, userBirthDay
  - 이메일 useremail
  - 성별 usergender
  - 핸드폰번호 usermobile1, usermobile2, usermobile3
  - 집번호 usertel1, usertel2, usertel3
- GET quit
  - url 에 쿼리스트링으로 할거임ㅇㅋ?
  ```html
  <a href="/user/quit?user_id=??">회원탈퇴</a>
  ```
  - user_id

## board

- GET list
- GET write
- POST write
  - req.body.??
  - 제목 subject
  - 글쓴이 author
  - 내용 content
- GET view
  - url 쿼리스트링으로 보낼거임
  - req.query.??
  - /board/view?\_id=??
  - \_id
- GET edit
  - url 쿼리스트링으로 보낼거임
  - req.query.??
  - /board/edit?\_id=??
  - \_id
- POST edit
  - req.body.??
  - 제목 subject
  - 글쓴이 author
  - 내용 content
- POST delete
  - 글번호 board_id

## admin

- GET /
- POST /
  - 아이디 adminid
  - 비밀번호 adminpw
- GET user
- GET user/edit
  - url 쿼리스트링
  - /admin/user/edit?user_id=??
  - user_id
  - req.query
- POST user/edit
  - 등급 level
  - 계정상태 isActive
  - 닉네임 useralias
  - 생년월일 userBirthYear, userBirthMonth, userBirthDay
  - 이메일 useremail
  - 성별 usergender
  - 핸드폰번호 usermobile1, usermobile2, usermobile3
  - 집번호 usertel1, usertel2, usertel3
- GET board
- POST board
  - req.body.??
  - board_id

# Coding-Convention

---

### 들여쓰기 :

### 변수와 함수 선언 : Camel-Case

### 세미콜론: 안붙이면 사형

### String 표기 : Single quote

### 콜백지옥: 사형

# Commit-message

---

- feat: 새로운 기능 추가
- fix: 버그수정
- docs: 문서(주석) 수정
- style: 코드 스타일 변경(오타 수정 포함)
- design: 사용자 UI 디자인 변경(CSS)

# Used-package

---

- express
- express-session
- memorystore
- mysql2
- nunjucks
- dotenv
