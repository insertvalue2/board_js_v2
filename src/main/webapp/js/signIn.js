// 데이터 및 초기화 
const inputs = document.querySelectorAll(".inputs");
const button = document.querySelector("button");
// 사용자 전체 조회 가져 오기 
const userList = JSON.parse(localStorage.getItem("userList"));

let count = 0;
const login = function () {
    count++;
    console.log(count);
    const username = inputs[0];
    console.log("username", username.value)
    const password = inputs[1];

    if (username.value.trim() === "") {
        alert("아이디를 입력하세요");
        username.focus();
        return;
    }

    if (password.value.trim() === "") {
        alert("비밀번호를 입력하세요");
        password.focus();
        return;
    }

    // 사용자 목록에서 username 확인 password 확인 
    if (userList !== null) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === username.value) {
                if (userList[i].password !== password.value) {
                    alert("잘못된 비밀번호 입니다");
                    inputs[1].focus();
                    break;
                } else {
                    // 로그인 성공 시 UserList 에 저장되어 있는 인덱스 번호를 
                    // user 속성에 값(인덱스 값)으로 할당
                    localStorage.setItem("user", i);
                    location.href = "board.html";
                    break;
                }
            }
        }

    } else {
        alert("등록된 사용자가 없습니다");
    }
}


// 이벤트 리스너 등록 
function addEventListener() {
    button.addEventListener('click', login);
}
// 이벤트 리스트 호출 
addEventListener();