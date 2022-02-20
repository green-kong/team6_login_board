CREATE DATABASE team6;

USE team6;

CREATE TABLE user (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    userid VARCHAR(32) NOT NULL,
    userpw VARCHAR(32) NOT NULL,
    username VARCHAR(32) NOT NULL,
    alias VARCHAR(32) NOT NULL,
    birthdate TIMESTAMP NOT NULL,
    gender CHAR(4) NOT NULL,
    email VARCHAR(64) NOT NULL,
    tel CHAR(32) ,
    mobile CHAR(32) NOT NULL,
    level INT NOT NULL DEFAULT 3,
    isActive BOOLEAN NOT NULL DEFAULT 1,
);

INSERT INTO user 
(userid, userpw, username, alias, birthdate, gender, email, mobile, level, isActive)
VALUES
('kong1234', 'qwer1234', '이동훈', 'kong', '1993-01-26', '남자', 'ahdjd@gmail.com', '01077498300','3','1');

INSERT INTO user 
(userid, userpw, username, alias, birthdate, gender, email, mobile, level, isActive)
VALUES
('ash1234', 'qwer4321', '안수환', 'ash', '1998-03-21', '남자', 'ash1234@gmail.com', '01012345678','3','1');

INSERT INTO user 
(userid, userpw, username, alias, birthdate, gender, email, mobile, level, isActive)
VALUES
('hjn1234', 'rewq1234', '홍종남', 'hjn', '1994-09-11', '남자', 'hjn1234@gmail.com', '01055664433','3','1');

INSERT INTO user 
(userid, userpw, username, alias, birthdate, gender, email, mobile, level, isActive)
VALUES
('kkh1234', 'rewq4321', '강귀현', 'kkh', '1993-11-22', '여자', 'kkh@gmail.com', '01023234545','3','1');

INSERT INTO user 
(userid, userpw, username, alias, birthdate, gender, email, mobile, level, isActive)
VALUES
('admin', 'admin', 'admin', 'admin', '1971-01-01', 'admi', 'admin', 'admin','1','1');

CREATE TABLE board (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(64) NOT NULL,
    content TEXT,
    date TIMESTAMP NOT NULL,
    author INT NOT NULL,
    hit INT
);

INSERT INTO board
(subject, content, date, author)
VALUES
('안녕하세요11', '잘부탁드립니다', current_timestamp, '1');

INSERT INTO board
(subject, content, date, author)
VALUES
('안녕하세요22', '잘부탁드립니다22', current_timestamp, '2');

INSERT INTO board
(subject, content, date, author)
VALUES
('안녕하세요33', '잘부탁드립니다33', current_timestamp, '3');

INSERT INTO board
(subject, content, date, author)
VALUES
('안녕하세요44', '잘부탁드립니다44', current_timestamp, '4');

INSERT INTO board
(subject, content, date, author)
VALUES
('안녕하세요44', '잘부탁드립니다44', current_timestamp, '1');