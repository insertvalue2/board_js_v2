/** read.js */

const title = document.getElementById("title");
const username = document.getElementById("username");
const imgBox = document.querySelector(".img-box");
const content = document.getElementById("content");

const boardList = JSON.parse(localStorage.getItem("boardList"));
const page = localStorage.getItem("page");



function load() {

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
    // splice 함수는 배열에서 요소를 제거하거나 교체할 때 사용
    // 여기서는 page 인덱스의 요소를 1개 제거하고, 업데이트된 board로 교체
    boardList.splice(page, 1, board);
    localStorage.setItem("board", JSON.stringify(boardList));
}

load();