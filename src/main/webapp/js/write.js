// DOM 선언 및 로컬 스토리지
const title = document.querySelector('.title');
const username = document.querySelector('.username');
const fileInput = document.querySelector('.file');
const imgViewBox = document.querySelector('.img-box');
const content = document.querySelector('.content');
const button = document.querySelector('button');
const day = new Date();
let imageData = null; 
console.log('--------------------------');

// 1. 로컬스토리지에 있는 사용자 목록 가져오기
// 2. 사용자 목록중에 로그인한 usercode 가져 오기
const userList = JSON.parse(localStorage.getItem('userList'));
// 로그인 페이지에서 로그인 성공시 user 키 값에 code 를 넣어 둠
const userCode = localStorage.getItem('user');
console.log(`userList type ${typeof userList}`);

// 로그인 여부 확인
function isSignIn() {
    if (userCode === null) {
        alert('로그인을 먼저 해주세요');
        location.href = 'signIn.html';
        return;
    }
    username.value = userList[userCode].username;
}

// 파일 업로드 함수  
function fileUpload(event) {
    // 목적 : 클라이언트 측 사용자에가 서버로 적절한 파일 업로드 환경을 제공하기 위함

    // event.target 속성은 이벤트가 발생한 요소(elements)인 <input> 요소 자체 
    const file = event.target.files[0]; // 파일리스트에서 0번째 파일 객체 반환 
     
    // 파일 하기전  
    // 유효성 검사(크기 및 확장자), 파일 미리보기, 파일 MIME TYPE 검사
    console.log(file.size);
    // 1byte ->  8bit
    // 1kb ->  1024byte 
    // 1mb -> 1024kb 
    // 5mb -> 바이트로 변환 5242880 (1024 * 1024 * 5)
    
    // 유효성 검사 -  파일크기 막기 
    if(file.size >= 5242880) {
        alert("첨부 파일은 5MB 이하만 가능합니다");
        event.target.value = '';
        return;
    }

    // 유효성 검사 - 허용하는 파일 확장자 
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif']; 
    if (!validFileTypes.includes(file.type)) {
        alert('유효한 파일 타입이 아닙니다. (jpeg, png, gif만 허용)');
        return;
    }

    // 파일 미리보기기능 추가  
    const reader = new FileReader();
    // 이벤트 핸들러 처리 
    reader.onload = function(e) {
        imgViewBox.innerHTML = `<img src="${e.target.result}" alt="" style="max-width: 100%; height: auto;">`;
        imageData = reader.result;

        // console.log('imageData', imageData);
    }
    // 파일 읽기 - 비동기적 동작(지정된 File,Blob 객체를 읽고 그 데이터를 Base64 로 변환)
    // Base64란 - 바이너리 데이터를 텍스트 형식으로 인코딩하는 방법 중 하나.
    //            ASCII 문자만을 사용하여 데이터를 표현하므로, 이메일, URL, XML, JSON 등 
    //            텍스트 기반 프로토콜에서 바이너리 데이터를 다룰 때 유용 
    reader.readAsDataURL(file);
    // 파일 읽기가 완료 되었을 때 onload 이벤트 발생 됨 

}


function addEventListener() {
    fileInput.addEventListener('change', function (event) {
        const files = fileInput.files; // // FileList 객체 반환
        // 아래는 학습하기 위한 확인 코드 
        if (files.length > 0) {
            const file = files[0]; // 선택된 첫 번째 파일 (File 객체)
            console.log(`File name: ${file.name}`);
            console.log(`File size: ${file.size} bytes`);
            console.log(`File type: ${file.type}`);
            console.log(`Last modified: ${file.lastModifiedDate}`);

            // 파일을 읽고 데이터 확인
            const reader = new FileReader();
            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                console.log(arrayBuffer); // 바이너리 데이터 확인
            };
            reader.readAsArrayBuffer(file); // 파일 데이터를 ArrayBuffer로 읽기
        }
        console.log('--------------------------------------------------------');
        // 이벤트 객체 전달 - 이벤트 타입, 이벤트 요소(태그), 추가 정보 등 포함
        fileUpload(event);
    });

    button.addEventListener('click', saveBoard);
}

// 여기서는 함수 표현식 사용해보기 
const saveBoard = function() {
    if(title.value === "" ) {
        alert('제목을 입력하시오');
        title.focus();
        return; 
    }

    if(username.value === "") {
        alert("작성자를 입력해주세요");
        username.focus();
        return; 
    }

    if(content.value ==="" ) {
        alert('내용을 입력해주세요');
        content.focus();
        return; 
    }

    const board = {
        title: title.value,
        content: content.value,
        username: username.value,
        today: day.getFullYear() + "." + (day.getMonth() + 1) + "." + day.getDate(),
        count: 0,
        imgData: imageData
    };

    // 로컬 스토리지에 저장 
    if(localStorage.getItem('boardList') == null ) {
        // 최초 저장 
        const boardArray = new Array();
        boardArray.push(board);
        // 배열을 JSON 형태로 변환 후 저장하기 
        localStorage.setItem("boardList", JSON.stringify(boardArray));
        
    } else {
        // JSON 형식으로 데이터가 저장되어 있는 상태의 BoardList 꺼내기 
        let arrays = JSON.parse(localStorage.getItem('boardList'));
        arrays.push(board); // 배열에 담고
        localStorage.setItem("boardList", JSON.stringify(arrays)); // JSON 문자열로 변환하여 저장
    }

    // 테스트 출력 
    //console.log('board-list', JSON.parse(localStorage.getItem('boardList')));
    const temp = JSON.parse(localStorage.getItem('boardList'));
    console.log(typeof temp);

    // 화면 이동
    // location.href = 'board.html';
}

isSignIn();
addEventListener();

