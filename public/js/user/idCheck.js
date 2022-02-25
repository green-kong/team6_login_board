idCheckBtn.addEventListener("click",()=>{
    const userid = document.querySelector('#userid').value;
    const idSpan = document.querySelector('#id_span');

    const reqJson = new Object();
    reqJson.userid = userid

    const xmlhttp = new XMLHttpRequest();
    // XHR ajxa 구현에 필요한 객체
    xmlhttp.open("POST", "http://localhost:3000/user/join/idCheck", true); 
    // 서버와 데이터를 교환할 때 필요한 정보 (GET or POST, 데이터 교환할 서버 url, 비동기 동기 설정)
    xmlhttp.setRequestHeader('content-type','application/json');
    // 요청 헤더내용을 content type : application/json 으로 보냄
    xmlhttp.send(JSON.stringify(reqJson));
    // 데이터 교환을 요청하는 함수 
    
    xmlhttp.onreadystatechange = ()=>{
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if (xmlhttp.response === "true") {
            idSpan.innerHTML = "사용할 수 있는 ID입니다."
        } else {
            idSpan.innerHTML = "사용할 수 없는 ID입니다."
        }
    } else {
        console.log('연결에러')
    }
    // onready
    // readyState 4 = 수신완료 상태
    // status 200 = 해당 url로 접근 성공
}
})



