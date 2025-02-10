$(document).ready(function() {
	let hideTimeout;

	// 로고 클릭 시 메인 페이지로 이동
	$('.logo').on('click', function() {
		window.location.href = '/BitCoding/main.bit';
	});

	// 프로필 메뉴 마우스 오버/아웃 시 메뉴 표시/숨기기
	$('.profile-container').on('mouseover', function() {
		clearTimeout(hideTimeout);
		$('#dropdownMenu').stop(true, true).slideDown(200);
	});

	$('.profile-container').on('mouseleave', function() {
		hideTimeout = setTimeout(function() {
			$('#dropdownMenu').stop(true, true).slideUp(200);
		}, 300);
	});

	// 로고 버튼 클릭 시 페이지 새로고침
	$('#logoButton').on('click', function() {
		location.reload();
	});

	// 게시글 데이터 (예제)
	const posts = Array.from({ length: 30 }, (_, i) => ({
		id: i + 1,
		title: `고민상담 ${i + 1}`,
		author: `QWER`,
		date: `2024-11-08`,
		views: Math.floor(Math.random() * 100)
	}));

	// 페이지네이션 설정
	const postsPerPage = 10;
	let currentPage = 1;
	const totalPages = Math.ceil(posts.length / postsPerPage);

	// DOM 요소 선택
	const postContainer = document.getElementById("postContainer");
	const paginationContainer = document.getElementById("paginationContainer");
	const prevBtn = document.getElementById("prevBtn");
	const nextBtn = document.getElementById("nextBtn");
	const modal = document.getElementById("postModal");
	const modalTitle = document.getElementById("modalTitle");
	const modalAuthor = document.getElementById("modalAuthor");
	const modalDate = document.getElementById("modalDate");
	const modalViews = document.getElementById("modalViews");
	const modalContent = document.getElementById("modalContent");
	const closeBtn = document.querySelector(".close-btn");

	// 게시글을 페이지에 맞게 렌더링하는 함수
	function renderPosts() {
		const start = (currentPage - 1) * postsPerPage;
		const end = start + postsPerPage;
		const postsToDisplay = posts.slice(start, end);

		// 게시글 목록을 테이블에 추가
		postContainer.innerHTML = postsToDisplay.map(post => `
            <tr data-id="${post.id}" class="post-row">
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.date}</td>
                <td>${post.views}</td>
            </tr>
        `).join("");

		// 페이지네이션 버튼 업데이트
		renderPaginationButtons();
	}

	// 페이지네이션 버튼 렌더링 함수
	function renderPaginationButtons() {
		paginationContainer.innerHTML = '';
		paginationContainer.appendChild(prevBtn);

		for (let i = 1; i <= totalPages; i++) {
			const button = document.createElement("button");
			button.textContent = i;
			button.classList.toggle("active", i === currentPage);
			button.addEventListener("click", () => goToPage(i));
			paginationContainer.appendChild(button);
		}

		paginationContainer.appendChild(nextBtn);

		// 이전, 다음 버튼 상태 업데이트
		prevBtn.disabled = currentPage === 1;
		nextBtn.disabled = currentPage === totalPages;
	}

	// 페이지 변경 함수
	function goToPage(page) {
		currentPage = page;
		renderPosts();
	}

	// 이전, 다음 버튼 클릭 이벤트
	prevBtn.addEventListener("click", () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	});

	nextBtn.addEventListener("click", () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	});

	// 초기 게시글 및 페이지네이션 렌더링
	renderPosts();

	// 게시글 클릭 시 모달 열기
	$(document).on("click", ".post-row", function() {
		const postId = $(this).data("id");
		const post = posts.find(p => p.id === postId);

		if (post) {
			// 모달에 게시글 데이터 삽입
			modalTitle.textContent = post.title;
			modalAuthor.textContent = post.author;
			modalDate.textContent = post.date;
			modalViews.textContent = post.views;
			modalContent.textContent = `여기에 게시글 ${post.id}의 내용이 표시됩니다.`;

			// 모달 열기
			modal.style.display = "flex";  // 모달을 중앙에 표시하기 위해 flex 사용
		}
	});

	// 모달 닫기 버튼 클릭 시 닫기
	closeBtn.addEventListener("click", function() {
		modal.style.display = "none";
	});

	// 모달 외부 클릭 시 닫기
	window.addEventListener("click", function(event) {
		if (event.target === modal) {
			modal.style.display = "none";
		}
	});

	// 글쓰기 버튼 클릭 시 글쓰기 모달 열기
	$('#writeBtn').on('click', function() {
		$('#writeModal').css('display', 'flex');
	});

	// 모달 닫기 버튼 클릭 시 글쓰기 모달 닫기
	$('.close-btn').on('click', function() {
		$('#writeModal').css('display', 'none');
	});

	// 모달 외부 클릭 시 모달 닫기
	$(window).on('click', function(event) {
		if (event.target.id === 'writeModal') {
			$('#writeModal').css('display', 'none');
		}
	});

	// 글쓰기 폼 제출 시 처리
	$('#writeForm').on('submit', function(event) {
		event.preventDefault();

		const title = $('#postTitle').val();
		const content = $('#postContent').val();

		// 서버로 데이터 전송 (예제)
		$.ajax({
			url: '/BitCoding/addPost.bit',
			type: 'POST',
			data: { title, content },
			success: function(response) {
				alert('글이 작성되었습니다.');
				$('#writeModal').css('display', 'none');
				location.reload(); // 작성 후 새로고침
			},
			error: function() {
				alert('글 작성에 실패했습니다.');
			}
		});
	});


	// 마이페이지 이동 버튼 클릭 이벤트
	$('#myPage').on('click', myPage);

	// 로그아웃 버튼 클릭 이벤트
	$('#logout').on('click', logout);

	// 로그아웃 함수
	function logout() {
		$.ajax({
			url: 'logout.bit',
			type: 'get',
			success: function(res) {
				if (res == "true") {
					console.log("로그아웃");
					window.location.href = '/BitCoding/home.bit';
				}
			},
		});
	}

	// 마이페이지 함수
	function myPage() {
		$.ajax({
			url: 'pagemy.bit',
			type: 'get',
			success: function(res) {
				if (res == "true") {
					window.location.href = '/BitCoding/pageprofile.bit';
				}
			},
		});
	}
});
