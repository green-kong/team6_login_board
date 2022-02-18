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
- GET login
- POST login
- GET profile
- POST quit

## board

- GET list
- GET write
- POST write
- GET view
- GET edit
- POST edit
- POST delete

## admin

- GET /
- POST /
- GET user
- GET user/edit
- POST user/edit
- GET board
- POST board

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
