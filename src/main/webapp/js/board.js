// 사용할 요소 접근 및 로컬스토리지 사용
const boardContainer = document.querySelector(".board-content-box");
const writeButton = document.querySelector(".btn");
const paginationContainer = document.querySelector(".num-box");

// 로컬스토리지에서 게시글 목록 들고 오기 
const storedBoardList = JSON.parse(localStorage.getItem("boardList"));

// 현재 페이지
let currentPage = 0;
const postsPerPage = 2; // 한 페이지당 게시글 수

// 초기 로드
loadPosts(currentPage);

// 게시글을 로드하는 함수
function loadPosts(page) {
    // 현재 페이지에 해당하는 게시글의 시작 인덱스와 끝 인덱스 계산
    const start = page * postsPerPage;
    const end = start + postsPerPage;

    let postElements = "";

    if (storedBoardList != null && storedBoardList.length > 0) {
        // 현재 페이지에 해당하는 게시글을 HTML 요소로 변환
        // 루프의 종료 조건을 두 가지로 설정
        // 게시글 목록의 마지막 인덱스에 도달 했을 때 
        // 하나라도 충족되지 않으면 루프가 종료
        for (let i = start; i < end && i < storedBoardList.length; i++) {
            postElements += `
                <div class="board">
                    <div class="board-1">${(i + 1)}</div>
                    <div class="board-2">${storedBoardList[i].title}</div>
                    <div class="board-3">${storedBoardList[i].username}</div>
                    <div class="board-4">${storedBoardList[i].today}</div>
                    <div class="board-5">${storedBoardList[i].count}</div>
                </div>
            `;
        }
        boardContainer.innerHTML = postElements;
        // row 한줄 선택 
        const postElementsCollection = document.querySelectorAll(".board");
        // 주의! 요소가 생성된 이후에 이벤트 리스너를 등록할 수 있다. 
        addPostClickListeners(postElementsCollection);

        createPagination(storedBoardList, page);
    } else {
        boardContainer.innerHTML = "<div class='no-list' style='text-align:center; margin-top:20px;'>조회된 게시글이 없습니다</div>";
    }
}

// 페이지네이션을 생성하는 함수
function createPagination(postList, currentPage) {
    const totalPosts = postList.length; // 전체 게시글 수
    const totalPages = Math.ceil(totalPosts / postsPerPage); // 전체 페이지 수 계산

    // 페이지 번호 HTML을 저장할 변수
    let paginationHTML = "";

    // 페이지 번호 생성
    // data-* 속성은 HTML5에서 사용자 정의 데이터를 요소에 저장할 수 있도록 제공하는 기능
    for (let i = 0; i < totalPages; i++) {
        paginationHTML += `
            <span class="num" data-page="${i}" style="font-size: 1.4em;">${i + 1}</span>
        `;
    }
    paginationContainer.innerHTML = paginationHTML;

    // 생성된 페이지 번호의 요소에 전체 접근 
    const pageNumbers = document.querySelectorAll(".num");
    // 현재 페이지 번호 스타일 적용
    pageNumbers[currentPage].style.backgroundColor = "aqua";
    pageNumbers[currentPage].style.fontWeight = 700;

    // 페이지 번호 클릭 이벤트 리스너 추가
    // 새로운 개념을 배워 보자 
    // dataset은 HTML 요소의 data-* 속성에 접근할 수 있는 특수한 속성입니다.
    pageNumbers.forEach(pageNumber => {
        pageNumber.addEventListener('click', (event) => {
            const page = parseInt(event.target.dataset.page);
            loadPosts(page);
        });
    });
}

// 게시글 클릭 시 페이지 이동 함수
function addPostClickListeners(postElements) {
    for (let i = 0; i < postElements.length; i++) {
        postElements[i].onclick = function () {
            // 상세글에서 해당 값으로 조회 
            localStorage.setItem("page", i);
            location.href = "read.html";
        };
    }
}

writeButton.onclick = function () {
    location.href = "write.html";
}
