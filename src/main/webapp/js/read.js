/** read.js */

const title = document.getElementById("title");
const username = document.getElementById("username");
const imgBox = document.querySelector(".img-box");
const content = document.getElementById("content");

const boardList = JSON.parse(localStorage.getItem("boardList")) || [];
const page = localStorage.getItem("page") || 0;
const button = document.querySelector(".btn");

// todo 수정 예정
const userCode = localStorage.getItem("user");

console.log("userCode", userCode);

function load() {
    if (!boardList.length || !boardList[page]) {
        console.error("Invalid board list or page.");
        return;
    }

    const board = boardList[page];
    if (board.img != null) {
        const img = document.createElement('img');
        img.src = boardList[page].img;
        imgBox.appendChild(img);
    }

    title.value = board.title;
    username.value = board.username;
    content.textContent = board.content;

    board.count = board.count + 1;

    // 기존의 게시물을 업데이트된 게시물로 교체
    boardList.splice(page, 1, board);
    localStorage.setItem("boardList", JSON.stringify(boardList));
}

function addEventListeners() {
    button.addEventListener('click', modifyPost);
}

function modifyPost() {
    if (!userCode || userCode === "null") {
        alert("로그인이 필요합니다.");
        location.href = "signin.html";
        return;
    }

    // 로그인 사용자와 글쓴이가 같은지 체크
    // 로직 스스로 만들어 보기 
    const user = getUserByUserCode(userCode);
   
    location.href = "modify.html";
}

function getUserByUserCode(userCode) {
    const userListHeader = JSON.parse(localStorage.getItem("userListHeader")) || {};
    return userListHeader[userCode];
}

// 초기화 함수 호출
load();
addEventListeners();
