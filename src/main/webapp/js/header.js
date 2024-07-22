// header.js
// 각 메뉴 요소를 querySelector를 사용하여 가져옵니다.
const boardMenu = document.getElementById('board');
const signInMenu = document.getElementById('signIn');
const signUpMenu = document.getElementById('signUp');


// 각 메뉴에 클릭 이벤트를 추가합니다.
boardMenu.addEventListener('click', function () {
    window.location.href = 'board.html'; // 게시판 페이지로 이동
});

signInMenu.addEventListener('click', function () {

    window.location.href = 'signIn.html'; // 로그인 페이지로 이동
});

signUpMenu.addEventListener('click', function () {
    window.location.href = 'signUp.html'; // 회원가입 페이지로 이동
});
