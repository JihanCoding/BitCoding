/* jshint esversion : 6 */
let user_info = {};
let user_like = {};
let isCheck = true;
let searchOp = "구분";
let searchKey = "";
let isSearch;
$(document).ready(function() {
	// js가 로드되었을때 유저 데이터 및 게시물 정보 받기
	prepare();

	// 모달 열기 및 닫기 기능
	const $modalCustom = $("#searchModalCustom");
	const $openModalButtonCustom = $("#search");
	const $closeModalButtonCustom = $(".close-modal-button-custom");

	$('#freeboard').on('click', function() {
		Swal.fire({
			title: 'information',
			text: '구현예정입니다.',
			icon: 'info',
			confirmButtonText: '확인',
			didOpen: function() {
				$('body').css('overflow-y', 'scroll'); // 스크롤바 강제 유지
			}
		});
	});
	// 모달 열기
	$openModalButtonCustom.on("click", function() {
		$modalCustom.show();
	});

	// 모달 닫기
	$closeModalButtonCustom.on("click", function() {
		$modalCustom.hide();
	});

	// 모달 외부 클릭 시 닫기
	$(window).on("click", function(event) {
		if ($(event.target).is($modalCustom)) {
			$modalCustom.hide();
		}
	});
	$(document).on("click", ".go-to-post-link", function(event) {
		let target = this;
		findPost(event, target);
	});

	// 검색 버튼 클릭 이벤트
	$("#searchButtonCustom").on("click", function() {
		const searchOption = $("#searchOptionCustom").val();
		const searchKeyword = $("#searchInputCustom").val();

		if (!searchOption || searchOption === "구분") {
			Swal.fire({
				title: 'Warning',
				text: '검색 기준을 선택하세요.',
				icon: 'warning',
				confirmButtonText: '확인',
				willOpen: function() {
					$('body').css('overflow', 'auto'); // 스크롤 유지
				},
				willClose: function() {
					$('body').css('overflow', ''); // 스크롤 설정 초기화
				}
			});
			return;
		}

		if (!searchKeyword) {
			Swal.fire({
				title: 'Warning',
				text: '검색 기준을 선택하세요.',
				icon: 'warning',
				confirmButtonText: '확인',
				willOpen: function() {
					$('body').css('overflow', 'auto'); // 스크롤 유지
				},
				willClose: function() {
					$('body').css('overflow', ''); // 스크롤 설정 초기화
				}
			});
			return;
		}
		// 포스트에 접근해서 작성자 제목 두가지 정보를 가져와야함
		// 검색 요청 처리 로직 (예: 서버로 전송)
		searchOp = searchOption;
		searchKey = searchKeyword;
		$modalCustom.hide();
		console.log(searchOp, "전달완료");
		console.log(searchKey, "전달완료");
		$("#searchOptionCustom").val('구분');
		$("#searchInputCustom").val('');
		prepare();
	});

	$(document).on('click', '.comment-toggle', toggleComments);
	$(document).on('click', '.category-item', function() {
		selectCategory(this, $(this).data('category'));
	});

	// 게시물 수정 삭제
	$('.postbox').on('click', '.edit-button', function() {
		Swal.fire({
			title: 'information',
			text: '구현예정입니다.',
			icon: 'info',
			confirmButtonText: '확인',
			didOpen: function() {
				$('body').css('overflow-y', 'scroll'); // 스크롤바 강제 유지
			}
		});
	});
	$('.postbox').on('click', '.delete-button', deletePost);
	// 이미지 업로드 시 미리보기
	$('#image-upload').on('change', function(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function(e) {
				$('#preview-img').attr('src', e.target.result);
				$('#image-preview').show();
			};
			reader.readAsDataURL(file);
		} else {
			$('#image-preview').hide();
		}
	});

	// 이미지 삭제 버튼 클릭 시 미리보기 제거
	$('#remove-image').on('click', function() {
		$('#image-upload').val(''); // 파일 인풋 초기화
		$('#image-preview').hide();
		$('#preview-img').attr('src', '');
	});
	// 게시물 생성
	$('#post-form').on('submit', function(event) {
		event.preventDefault();

		const file = $('#image-upload')[0].files[0];
		if (file) {
			addPost(file);
		} else {
			addPost('assets/images/profiles/profile.jpg'); // 파일이 없으면 null 전달
		}
		$('.modal').removeClass('active');
		$('.modal-overlay').removeClass('active');

		// 이미지 미리보기 숨기기 및 초기화
		$('#image-preview').hide();
		$('#preview-img').attr('src', '');
	});
	// 모달 닫기 버튼
	$('.modal-close').on('click', function() {
		$('.modal').removeClass('active');
		$('.modal-overlay').removeClass('active');
	});

	// 게시물 좋아요 버튼 (동적 요소에 대한 이벤트 위임)
	$(document).on('click', '.increase-count-button', function() {
		postLike($(this));
	});

	// 좋아요 버튼 클릭 시 색상 변경
	$(document).on("click", ".like-button", function() {
		const btn = $(this);
		checkCmt(btn);
	});

	// 메시지 버튼 클릭 시 색상 변경
	$(document).on("click", ".chat-button", function() {
		const btn = $(this);
		checkCmt(btn);
	});


	// 댓글 작성 버튼 클릭 시
	$(document).on("click", ".add-comment-button", function() {
		const postContainer = $(this).closest(".post"); // 현재 게시물 컨테이너 찾기
		const postId = $(this).closest(".post").data("id"); // 게시물 고유 아이디값
		const inputField = postContainer.find(".new-comment"); // 해당 게시물의 댓글 입력 필드
		const commentContainer = postContainer.find(".comments"); // 해당 게시물의 댓글 목록
		inputComment(inputField, commentContainer, postId); // 특정 게시물의 필드와 목록에만 적용
	});

	// Enter 키 이벤트로 댓글 추가
	$(document).on("keypress", ".new-comment", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			const postContainer = $(this).closest(".post"); // 현재 게시물 컨테이너 찾기
			const postId = $(this).closest(".post").data("id"); // 게시물 고유 아이디값
			const inputField = $(this); // 현재 댓글 입력 필드
			const commentContainer = postContainer.find(".comments"); // 해당 게시물의 댓글 목록
			inputComment(inputField, commentContainer, postId);
		}
	});

	$(".share-thoughts-button").on('click', function() {
		$('.modal').addClass('active');
		$('.modal-overlay').addClass('active');
	});
	// 모달 외부 영역 클릭 시 모달 닫기
	$('.modal-overlay').on('click', function() {
		$('.modal').removeClass('active');
		$(this).removeClass('active');
	});
});

function selectCategory(button, category) {
	const categoryItems = $('.category-item');
	const posts = $('.post');

	// 모든 카테고리 항목의 active 클래스 초기화
	categoryItems.removeClass('active');
	$(button).addClass('active');

	// 선택된 카테고리에 따라 게시글 표시/숨김 처리
	posts.each(function() {
		const post = $(this);
		if (category === 'all' || post.data('category') === category) {
			post.show();
		} else {
			post.hide();
		}
	});
}

function updateCommentCount(post) {
	const toggleButton = post.find('.comment-toggle');
	const comments = post.find('.comments');
	const commentCount = comments.find('.comment').length;
	toggleButton.html(`💬Comments ${commentCount}`);
}

function toggleComments() {
	const toggleButton = $(this);
	const post = toggleButton.closest('.post');
	const commentsContainer = post.find('.comments');
	const commentCount = commentsContainer.find('.comment').length;

	if (commentsContainer.is(':hidden')) {
		commentsContainer.show();
		toggleButton.html(`🔽Hide`);
	} else {
		commentsContainer.hide();
		toggleButton.html(`💬Comments ${commentCount}`);
	}
}
// 게시물 동적 생성 로직
function addPost(imageDataUrl) {
	// FormData 객체 생성
	const formData = new FormData();
	formData.append('author', user_info.nickname);
	formData.append('category', $('select[name="np_category"]').val());
	formData.append('tf', $('select[name="np_tf"]').val());
	formData.append('title', $('input[name="np_title"]').val());
	formData.append('content', $('textarea[name="np_content"]').val());
	formData.append('tags', $('input[name="np_tag"]').val());
	formData.append('email', user_info.email);
	formData.append('image', imageDataUrl);

	// DB에 게시물 저장
	// post_idx, post_title, post_content, post_file, create_at, email, nick, post_type, profile, category, post_tag
	$.ajax({
		url: 'createPost.bit', // 서블릿 URL
		type: 'post',  // HTTP 요청 방식
		data: formData,
		processData: false, // 파일 업로드를 위해 false로 설정
		contentType: false, // 파일 업로드를 위해 false로 설정
		success: function(data) {
			if (data == 'true') {
				console.log('DB 게시물 생성 성공')
			}
		}
	});
	// 각 필드 초기화
	$('#category').val(''); // 카테고리 초기화
	$('#tf').val(''); // T/F 선택 초기화
	$('#title').val(''); // 제목 초기화
	$('#content').val(''); // 내용 초기화
	$('#image-upload').val(''); // 파일 인풋 초기화
	$('#tags').val(''); // 태그 초기화

	// 게시물 작성시 서버에 있는 게시물 고유키값을 가져오기 위해 다시 초기화
	location.reload();
}
function inputComment(inputField, commentContainer, postId) {
	const newCommentText = $(inputField).val();

	if (newCommentText) {
		$.ajax({
			url: 'createComment.bit',
			type: 'post',
			data: {
				'post_id': postId,
				'cmt_content': newCommentText
			},
			success: function(res) {
				if (res == 'true') {
					console.log('DB 댓글 생성 성공');

					// 댓글 영역 초기화 후 새로 로드
					commentContainer.empty(); // 기존 댓글 제거

					// loadComments가 완료된 후 스크롤 이동
					loadComments(postId).then(() => {
						// 로드가 끝난 후 댓글창을 강제로 표시
						$('.comments').show();

						// 댓글창 토글 버튼 업데이트 (아이콘/텍스트를 '숨기기'로 변경)
						const toggleButton = commentContainer.closest('.comment-section').find('.comment-toggle');
						toggleButton.html('🔽Hide');

						// 스크롤을 맨 아래로 이동
						commentContainer.scrollTop(commentContainer.prop("scrollHeight"));
					});
				}
			},
			error: function() {
				alert("댓글 추가에 실패했습니다. 다시 시도해 주세요.");
			}
		});

		// 입력 필드 초기화
		$(inputField).val("");
	}
}


function getData() {
	$.ajax({
		url: 'getData.bit', // 서블릿 URL
		type: 'post',  // HTTP 요청 방식
		dataType: 'json', // 응답 데이터 형식
		success: function(data) {
			// 서블릿에서 받은 데이터를 사용

			user_info.email = data.email;
			user_info.nickname = data.nick;
			user_info.gender = data.gender;
			user_info.profile = data.profile;
			user_info.tf = data.mem_type;

			if (user_info.tf == "Feeling") {
				$(".user_info_type").css("color", "#FF5C5C");
			}
			else {
				$(".user_info_type").css("color", "#6C63FF");
			}
		}
	});
}
function prepare(callback) {
	$(".postbox").empty();
	getData();
	postRank();
	console.log('prepare 진입');

	$.ajax({
		url: 'getPost.bit', // 서블릿 URL
		type: 'GET', // HTTP 요청 방식
		dataType: 'json', // 응답 데이터 형식
		success: function(data) {
			// 서블릿에서 받은 데이터를 사용
			if (data) {
				data.forEach(item => {
					let shouldLoadComments = false;

					// 검색 기준이 '제목'인 경우
					if (searchOp === "제목" && item.post_title.includes(searchKey)) {
						getPost(item.post_idx, item.profile, item.category, item.nick, item.mem_type, item.post_type, item.post_title, item.post_content, item.post_file, item.post_tag, item.create_at, item.post_like);
						updateLike(item.post_idx);
						shouldLoadComments = true;
						isSearch = true;
					}
					// 검색 기준이 '작성자'인 경우
					else if (searchOp === "작성자" && item.nick.includes(searchKey)) {
						getPost(item.post_idx, item.profile, item.category, item.nick, item.mem_type, item.post_type, item.post_title, item.post_content, item.post_file, item.post_tag, item.create_at, item.post_like);
						updateLike(item.post_idx);
						shouldLoadComments = true;
						isSearch = true;
						console.log("작성자 선택", item.nick, "일치");
					}
					// 검색 기준이 '구분'일 경우 모든 게시물을 가져옴
					else if (searchOp === "구분") {
						console.log("전체조회");
						getPost(item.post_idx, item.profile, item.category, item.nick, item.mem_type, item.post_type, item.post_title, item.post_content, item.post_file, item.post_tag, item.create_at, item.post_like);
						updateLike(item.post_idx);
						shouldLoadComments = true;
						isCheck = false;
					}

					// 조건에 맞는 게시물에 대해서만 댓글 로딩
					if (shouldLoadComments) {
						loadComments(item.post_idx);
						$('.comments').hide();
					}
				});
			}

			// AJAX 작업이 완료된 후 콜백 호출
			if (typeof callback === "function") {
				callback();
			}
		},
		error: function(error) {
			console.error("AJAX 호출 오류:", error);

			// 오류가 발생했을 때도 콜백이 있다면 호출
			if (typeof callback === "function") {
				callback();
			}
		}
	});
}
function getPost(idx, profile, category, author, user_type, tf, title, content, postimage, tags, date, count) {
	let color;
	console.log(user_type)
	if (user_type === "Feeling") {
		color = 'color: #FF5C5C;';
	}
	else {
		color = 'color: #6C63FF;';
	}
	const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
	const newPostHTML = `
        <div class="post" data-category="${category}" data-id =${idx}>
            <div class="post-header">
                <img src="assets/images/profiles/${profile}" alt="Profile" class="profile-image" onerror="this.onerror=null; this.src='assets/images/nomal.webp';">
                <div class="post-info">
                    <div class="post-author">${author}</div>
                    <div class="post-role" style = "${color}">${user_type}</div>
                    <div class="post-date">작성일: ${date}</div>
                </div>
                <div class="post-actions2">
                    <span class="edit-button"><i class="fas fa-edit"></i> Update</span>
                    <span class="delete-button"><i class="fas fa-trash-alt"></i> Delete</span>
                </div>
            </div>
            <div class="post-title">${title}</div>
            <div class="post-content">${content}</div>
            <img class="post-image" src="assets/images/profiles/${postimage}" onerror="this.onerror=null; this.src='assets/images/nomal.webp';">
            <div class="post-tags"><span style="font-weight: bold;">#${category}&nbsp;</span><span style="font-weight: bold;">#${tf}&nbsp;</span>${tags}</div>
            <div class="comment-section">
                <div class="reaction-container">
                    <button class="comment-toggle">💬Comments<span class="comment-count"></span></button>
                    <div class="reaction-buttons">
                        <span class="reaction-button increase-count-button" data-count-type="like"><span class = "like-icon">${icon}</span><span class="like-count">${count}</span></span>
                    </div>
                </div>
                <div class="comments"></div>
                <div class="comment-form">
                    <input type="text" class="new-comment" placeholder="댓글을 입력하세요.">
                    <button class="add-comment-button">Submit</button>
                </div>
            </div>
        </div>
    `;
	// `postbox`에 새로운 게시물 추가
	$(".postbox").append(newPostHTML);
	const lastPost = $(".postbox .post").last();
	// 작성자와 현재 유저 정보 비교 후 버튼 숨기기
	if (author !== user_info.nickname) {

		lastPost.find(".edit-button, .delete-button").css("display", "none");
	}

	// 둘다 다를떄만 들어옴
	if (author === user_info.nickname || tf === user_info.tf || tf === "ALL") {
		console.log("요구사항 통과");
		console.log("author", author);
		console.log("user_info.nickname", user_info.nickname);
		console.log("게시물타입", tf);
		console.log("유저타입", user_info.tf);
	}
	else {
		console.log('개같은인생', author);
		// 해당 게시물의 댓글 입력창 숨기기
		lastPost.find(".comment-form").css("display", "none");
		// 안내 문구 추가
		lastPost.find(".comment-section").append(`
        <div class="comment-notice" style="color: #1E90FF; font-weight:bold">
            댓글을 작성할 권한이 없습니다.
        </div>
    `);
	}
}

function getComment(cmt_idx, post_idx, profile, nick, content, date, like, chat) {
	// post_idx로 해당 게시물의 commentContainer 찾기
	const postElement = $(`.post[data-id='${post_idx}']`);
	const author = postElement.find(".post-author").text().trim(); // .post 내 .post-author에서 텍스트 가져오기

	const chatIcon = `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 3c-4.96 0-9 3.77-9 8.39 0 2.1.84 4.01 2.21 5.5-1.44 3.15-2.03 3.66-2.03 3.66-.15.13-.2.34-.12.51.08.17.26.28.46.28 1.04 0 4.35-1.47 6.31-2.65.86.24 1.76.36 2.7.36 4.96 0 9-3.77 9-8.39S16.96 3 12 3z"></path></svg>`;
	const likeIcon = `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;

	const newComment = $(`
        <div class="comment"  data-post = ${post_idx} data-id =${cmt_idx}>
            <img src="assets/images/profiles/${profile}" class="comments-img" onerror="this.onerror=null; this.src='assets/images/nomal.webp';">
            <span class="comment-author">${nick} :&nbsp;</span>
            <p class="comment-text">${content}</p>
            <div class="like-chat-buttons">
                <div class="comment-date">${date}</div>
                <button class="chat-button">${chatIcon}</button>
                <button class="like-button">${likeIcon}</button>
            </div>
        </div>
    `);

	if (author !== user_info.nickname) {
		newComment.find(".like-button, .chat-button").css("display", "none");
	}
	console.log('댓글생성');
	console.log(like);
	console.log(chat);
	if (like === "true") {
		newComment.find('button.like-button').addClass('active');
	}
	else if (like === "false") {
		newComment.find("button.like-button").removeClass('active');
	}
	if (chat === "true") {
		console.log("챗 트루");
		newComment.find("button.chat-button").addClass('active');
	}
	else if (chat === "false") {
		newComment.find("button.chat-button").removeClass('active');
	}

	const commentContainer = $(`.post[data-id='${post_idx}']`).find(".comments");
	// 댓글 추가 및 표시
	$(commentContainer).append(newComment).show();

	// 댓글 수 업데이트
	updateCommentCount($(commentContainer).closest('.comment-section'));
}

function loadComments(targetPostIdx = null) {
	return new Promise((resolve) => {
		$.ajax({
			url: 'getComment.bit', // 서블릿 URL
			type: 'GET',  // HTTP 요청 방식
			dataType: 'json', // 응답 데이터 형식
			success: function(data) {
				// 댓글 로드 및 화면에 추가
				if (data) {
					data.forEach(item => {
						// targetPostIdx가 null이 아니면 특정 게시물의 댓글만 로드
						if (targetPostIdx === null || item.post_idx === targetPostIdx) {
							getComment(item.cmt_idx, item.post_idx, item.profile, item.nick, item.cmt_content, item.create_at, item.co_like, item.co_chat);
							console.log("라이크:", item.co_like);
							console.log("챗:", item.co_chat);
						}
					});
				}
				$('.comments').hide(); // 조건에 따라 숨김 설정

				resolve(); // 로드 완료 후 Promise를 해결
			}
		});
	});
}

function editPost() {
	/*	console.log('에디트0들어옴');
		const post = $(this).closest(".post"); // 현재 게시물 컨테이너 찾기
		const postId = post.data("id"); // data-id 값 가져오기
		console.log('id: ', postId);
		$.ajax({
			url: 'updatePost.bit', // 서블릿 URLF
			type: 'post',  // HTTP 요청 방식
			data: {
				'id': postId
			},
			success: function(res) {
				// 서블릿에서 받은 데이터를 사용
				if (res) {
					console.log('게시물 수정 완료');
					prepare();
				}
				else {
					console.log('게시물 수정 실패');
				}
			}
		});*/
}
function deletePost() {
	console.log('딜리트0들어옴');
	const post = $(this).closest(".post"); // 현재 게시물 컨테이너 찾기
	const postId = post.data("id"); // data-id 값 가져오기
	console.log('id: ', postId);
	$.ajax({
		url: 'deletePost.bit', // 서블릿 URLF
		type: 'post',  // HTTP 요청 방식
		data: {
			'id': postId
		},
		success: function(res) {
			// 서블릿에서 받은 데이터를 사용
			if (res) {
				console.log('게시물 삭제 완료');
				prepare();
			}
			else {
				console.log('게시물 삭제 실패');
			}
		}
	});
}
async function postLike(like) {
	like.prop('disabled', true); // 클릭 방지

	const countType = like.data('count-type');
	const $countSpan = like.find(`.${countType}-count`);
	let currentCount = parseInt($countSpan.text(), 10);

	const postId = like.closest('.post').data('id');
	const postAuthor = $(`.post[data-id="${postId}"]`).find('.post-author').text();

	try {
		// getLikeData 완료될 때까지 대기
		await getLikeData(postAuthor);

		let current_po_like = user_like.po_like; // 데이터 로드 후 사용 가능
		console.log('클릭이벤트 진입', isCheck, "현상태");

		if (like.hasClass('active')) {
			let sendCount = currentCount - 1;
			$countSpan.text(sendCount); // 좋아요 수 감소
			current_po_like -= 1;
			console.log('마이너스');
			$.ajax({
				url: 'deleteLike.bit',
				type: 'GET',
				data: {
					'post_id': postId,
					'user_id': user_info.email,
					'post_like': sendCount
				},
				success: function(res) {
					if (res == "true") {
						like.removeClass('active');
						like.find('.like-icon').css('color', 'gray');
						like.prop('disabled', false);
						isCheck = true; // 상태 변경
						updateUserLike(postAuthor, current_po_like, user_like.co_like);
					}
				}
			});
		} else { // 좋아요 추가할 때
			let sendCount = currentCount + 1;
			$countSpan.text(sendCount); // 좋아요 수 증가
			current_po_like += 1;
			console.log('플러스');
			$.ajax({
				url: 'createLike.bit',
				type: 'GET',
				data: {
					'post_id': postId,
					'user_id': user_info.email,
					'post_like': sendCount
				},
				success: function(res) {
					if (res == "true") {
						like.addClass('active');
						like.find('.like-icon').css('color', 'red');
						like.prop('disabled', false);
						isCheck = false; // 상태 변경
						updateUserLike(postAuthor, current_po_like, user_like.co_like);
					}
				}
			});
		}
	} catch (error) {
		console.error('getLikeData 실패:', error);
	}
}
function updateLike(postId) {
	//.post[data-id="postId"]의 자식 요소 중 .increase-count-button을 선택
	console.log(postId, "받아서 업데이트");
	const $button = $('.post').filter(`[data-id="${postId}"]`).find('.increase-count-button');
	$.ajax({
		url: 'checkLike.bit', // 서블릿 URL
		type: 'GET',  // HTTP 요청 방식
		data: {
			'post_id': postId,
			'user_id': user_info.email
		},
		success: function(data) {
			if (data == "true") {
				$button.find('.like-icon').css('color', 'red'); // 아이콘 색상 빨간색으로 변경
				$button.addClass('active');
			}
			else {
				$button.find('.like-icon').css('color', 'gray'); // 아이콘 색상 회색으로 변경
				$button.removeClass('active');
			}
		}
	});
}

function getCurrentFormattedTime() {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getLikeData(nick) {
	return new Promise((resolve, reject) => {
		console.log('겟데이터 들어옴');
		console.log(nick + ' 닉값입니다.');

		$.ajax({
			url: 'getLikeData.bit', // 서블릿 URL
			type: 'post',  // HTTP 요청 방식
			data: { 'user_id': nick },
			success: function(data) {
				const like = data;
				user_like.user_id = like.user_id;
				user_like.po_like = like.po_like;
				user_like.co_like = like.co_like;

				console.log(user_like.user_id, "데이터 가져옴");
				console.log(user_like.po_like, "데이터 가져옴");
				console.log(user_like.co_like, "데이터 가져옴");

				resolve(); // 데이터 로드 완료 후 Promise 성공 처리
			},
			error: function(status, error) {
				console.error('AJAX 요청 실패:', status, error);
				reject(error); // 에러 발생 시 Promise 실패 처리
			}
		});
	});
}

function updateUserLike(nick, cnt1, cnt2) {
	console.log("닉값", nick);
	console.log("po값", cnt1);
	console.log("co값", cnt2);
	// 댓글일땐 댓글주인
	$.ajax({
		url: 'updateUserLike.bit', // 서블릿 URL
		type: 'post',  // HTTP 요청 방식
		data: {
			'user_id': nick,
			'po_like': cnt1,
			'co_like': cnt2
		},
		success: function(res) {
			if (res === "true") {
				console.log("user_like 업데이트 성공")
			}
			else {
				console.log("user_like 업데이트 실패")
			}
		}
	});
}

async function checkCmt(btn) {
	const commentElement = $(btn).closest('.comment');

	// data-id와 data-post 속성 값을 가져오기
	// 버튼 클릭이벤트 두개 하나로 묶어서 해도됌 이렇게하면
	const author = commentElement.find('.comment-author').text().replace(/\s*:\s*/, "");
	console.log(author);
	const commentId = commentElement.data('id');
	const postId = commentElement.data('post');

	let likeState;
	let chatState;
	try {
		// getLikeData 완료될 때까지 대기
		await getLikeData(author);

		let co_like = user_like.co_like;
		// 눌린 버튼이 like-button인지 chat-button인지 확인
		if ($(btn).hasClass('like-button')) {
			// like 버튼 상태 확인 및 클래스 토글
			if ($(btn).hasClass('active')) {
				$(btn).removeClass('active');
				co_like--;
				likeState = "false";
			} else {
				$(btn).addClass('active');
				co_like++;
				likeState = "true";
			}
			chatState = commentElement.find('.chat-button').hasClass('active') ? "true" : "false";
			updateUserLike(author, user_like.po_like, co_like);
		}
	}
	catch (error) {
		console.error('getLikeData 실패:', error);
	}

	if ($(btn).hasClass('chat-button')) {
		// chat 버튼 상태 확인 및 클래스 토글
		if ($(btn).hasClass('active')) {
			$(btn).removeClass('active');
			chatState = "false";
		} else {
			$(btn).addClass('active');
			chatState = "true";
			Swal.fire({
				title: 'Success!!',
				text: '채팅 신청이 완료되었습니다!',
				icon: 'success',
				confirmButtonText: '확인'
			});
		}
		likeState = commentElement.find('.like-button').hasClass('active') ? "true" : "false";
	}

	console.log('포스트아이디 : ', postId);
	console.log('댓글아이디 : ', commentId);
	console.log('라이크 : ', likeState);
	console.log('챗 : ', chatState);

	updateCmt(postId, commentId, likeState, chatState)
}

function updateCmt(post, cmt, like, chat) {
	$.ajax({
		url: 'updateCmt.bit', // 서블릿 URL
		type: 'post',  // HTTP 요청 방식
		data: {
			'post_idx': post,
			'cmt_idx': cmt,
			'like': like,
			'chat': chat
		},
		success: function(res) {
			if (res == "true") {
				console.log('댓글 업데이트 성공');
			}
			else {
				console.log('댓글 업데이트 실패');
			}
		}
	});
}
function postRank() {
	const medals = ["gold.png", "silver.png", "bronze.png"];
	$.ajax({
		url: 'getPostRank.bit', // 서블릿 URL
		type: 'GET',  // HTTP 요청 방식
		dataType: 'json', // 응답 데이터 형식
		success: function(data) {
			$(".top10-list").empty();
			// 서블릿에서 받은 데이터를 사용
			if (data) {
				data.forEach((item, index) => {
					let rankImage;
					rankImage = medals[index] || ""; // index가 0, 1, 2일 때 해당 메달 이미지 설정
					getRank(rankImage, item.profile, item.nick, item.mem_type, item.post_title, item.post_idx); // 인덱스를 추가로 전달
				});
			}
		}
	});
}

function getRank(rankImage, profile, nick, mem_type, content, link) {
	let color;
	if (mem_type === "Feeling") {
		color = 'color: #FF5C5C;';
	}
	else {
		color = 'color: #6C63FF;';
	}
	const newPostHTML = `
        <li><img src="assets/images/${rankImage}" class="trophy-icon">
        <img src="assets/images/profiles/${profile}" class="profile-img" onerror="this.onerror=null; this.src='assets/images/nomal.webp';">
         <div class="content"><p class="author">${nick} <span class="author-tf" style ="${color}">${mem_type}</span></p><a href="${link}" class="go-to-post-link">${content}</a>
         </div>
      </li>
    `;
	$(".top10-list").append(newPostHTML);
}
function findPost(event, target) {
	event.preventDefault();

	// href 속성에서 data-id 값을 추출
	const targetId = $(target).attr("href").replace("#", "");
	console.log("타겟아이디", targetId);

	// 스크롤 이동 함수 정의
	function scrollToTarget() {
		const $targetElement = $(`.post[data-id="${targetId}"]`);
		if ($targetElement.length) {
			$("html, body").animate({
				scrollTop: $targetElement.offset().top - 90
			}, 800);
		} else {
			alert("해당 게시물을 찾을 수 없습니다.");
		}
	}

	// prepare가 필요 없는 경우 바로 스크롤 이동
	if ($(`.post[data-id="${targetId}"]`).length) {
		scrollToTarget();
	} else {
		// prepare가 필요한 경우, 완료 후 콜백으로 스크롤 이동
		if (isSearch) {
			searchOp = "구분";
			isSearch = false;
			prepare(() => {
				// prepare가 완료된 후 약간의 지연을 두고 스크롤 실행
				setTimeout(scrollToTarget, 200); // 200ms 지연
			});
		}
	}
}
