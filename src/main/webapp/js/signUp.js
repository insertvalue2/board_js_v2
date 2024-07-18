// 1단계 
// 변수 선언과 초기화(요소 접근)
const inputs = document.querySelectorAll(".inputs");
const checkIdBtn = document.getElementById("checkIdBtn");
const signUpBtn = document.getElementById("signUpBtn");
const toDay = new Date();

console.log(inputs);

// 아이디 중복 확인을 위해 로컬 스토리지에서 사용자 정보를 가져 오기 
// 로컬메모리지, 세션메모리지 
function getUserInfo() {

    let userListString = localStorage.getItem("userList");
    // null 여부 확인 
    if(userListString === null) {
        return []; // null 이면 빈 배열 리턴 처리 
    } else {
        return JSON.parse(userListString);
    }
}

// 로컬 메모리지에 접근해서 저장되어 있는 사용자 정보 전체 가져오기 
const userInfo = getUserInfo();

// 아이디 중복 검사 확인 함수 
function checkDuplicateId() {
    const inputUsername = inputs[0].value.trim();
    console.log("username", inputUsername);

    // 공백이라면
    if(inputUsername === "") {
        alert("아이디를 입력하세요");
        inputs[0].focus();
        return;
    }

    let isDuplicatedId = false; 
    // UserInfo 배열을 순회 하면서 중복 아이디 검사 
    for(let i = 0; i < userInfo.length; i++) {
        if(userInfo[i].username === inputUsername) {
            isDuplicatedId = true;
            break; 
        } 
    }

    if(isDuplicatedId) {
        alert("이미 존재하는 아이디입니다");
        inputs[0].focus;
    } else {
        alert('사용가능한 아이디입니다');
        inputs[0].readOnly = true; 
        inputs[0].style.backgroundColor = "blue";
    }
}

function registerUser() {
    const username = inputs[0];
    const nickname = inputs[1];
    const password = inputs[2];
    const confirmPassword = inputs[3];

    // 스크립트단 유효성 검사 
    if(!username.readOnly) {
        alert("아이디 중복확인을 해주세요");
        username.focus();
        return;    
    }

    if(nickname.value.trim() === "") {
        alert("닉네임을 입력하세요!");
        nickname.focus();
        return;
    }

    if(password.value.trim() === "") {
        alert("비밀번호를 입력하세요");
        password.focus()
        return; 
    }

    if(password.value !== confirmPassword.value) {
        alert("비밀번호가 일치 하지 않습니다.");
        password.focus();
        return;
    }

    // 새로운 사용자 생성 
    const newUser = {
        username: username.value,
        nickname: nickname.value,
        password: password.value,
        today: toDay.getFullYear() + "." + ( toDay.getMonth() + 1 ) + "." + toDay.getDate() 
    };

    // 새로운 사용자 정보를 userInfo 배열에 추가 
    userInfo.push(newUser);

    // localStorage 에 문자열로(JSON형식) 변환해서 저장하기 
    localStorage.setItem("userList", JSON.stringify(userInfo));
    alert("회원가입 완료");

    window.location.href = "signIn.html"; 

}


function addEventListener() {
    checkIdBtn.addEventListener('click', checkDuplicateId);
    signUpBtn.addEventListener('click', registerUser);
}

console.log("signup.js : user json - \n " + getUserInfo()); // Object 
// 객체 형태로 콘솔창에 출력 방법
console.log("signup.js : Object", userInfo); // Object 
// 문자열 형태로 콘솔창에 출력 벙법
console.log("JSON String type : ",  JSON.stringify(userInfo));


addEventListener(); // 이벤트 리스너 등록