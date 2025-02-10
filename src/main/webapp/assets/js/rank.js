let user_info = {};
let user_like = {};
$(document).ready(function() {
	// getData 함수 호출 후 작업 실행 예시
	getData().then(() => {
		console.log("유저 데이터를 모두 가져왔습니다.");
		// 데이터를 모두 가져온 후 실행할 후속 작업
		getLikeDataALL().then(() => {
			console.log("좋아요 데이터를 모두 가져왔습니다.");
			prepare();
			// 데이터를 모두 가져온 후 실행할 후속 작업
		}).catch((error) => {
			console.error("좋아요 데이터 가져오기 실패:", error);
		});
	}).catch((error) => {
		console.error("유저 데이터 가져오기 실패:", error);
	});

	let hideTimeout;
	$('.logo').on('click', function() {
		window.location.href = '/BitCoding/main.bit';
	})
	$('.profile-container').on('mouseover', function() {
		console.log("gg");
		clearTimeout(hideTimeout); // 숨기기 딜레이 취소
		$('#dropdownMenu').stop(true, true).slideDown(200); // 메뉴 표시
	});

	$('.profile-container').on('mouseleave', function() {
		hideTimeout = setTimeout(function() {
			$('#dropdownMenu').stop(true, true).slideUp(200); // 메뉴 숨기기
		}, 300); // 숨기기 딜레이 추가 (300ms)
	});

	$('#logoButton').on('click', function() {
		location.reload(); // 페이지 새로고침
	});

	// 1. 탭 전환 기능
	$(".tab-button").click(function() {
		// 모든 탭 버튼에서 active 클래스 제거
		$(".tab-button").removeClass("active");
		// 클릭된 버튼에 active 클래스 추가
		$(this).addClass("active");

		// 선택된 탭에 해당하는 콘텐츠만 표시
		const selectedTab = $(this).data("tab");  // 탭 버튼의 data-tab 속성 값 가져오기
		$(".ranking-column").hide();  // 모든 랭킹 컬럼 숨기기
		$(`.${selectedTab}`).show();  // 선택된 탭의 콘텐츠만 표시
	});

	// 페이지가 로드될 때 기본적으로 Post Likes 탭만 표시
	$(".ranking-column").hide();  // 모든 랭킹 컬럼 숨기기
	$(".posts-likes").show();     // posts-likes 컬럼만 표시

	$('#myPage').on('click', myPage);
	$('#logout').on('click', logout);

	$('#loading-screen').fadeOut(600);
});
$(window).on('load', function() {
	$('#loading-screen').fadeOut(600); // 600ms 동안 페이드 아웃
});
function logout() {
	$.ajax({
		url: 'logout.bit',// 요청 URL주소
		type: 'get',// GET POST
		data: {
		},
		success: function(res) {

			if (res == "true") {
				console.log("로그아웃");
				window.location.href = '/BitCoding/home.bit';
			}
		},
	});
}

function myPage() {
	console.log("들어옴");
	$.ajax({
		url: 'pagemy.bit',// 요청 URL주소
		type: 'get',// GET POST
		data: {
		},
		success: function(res) {

			if (res == "true") {
				console.log("마이페이지 이동");
				window.location.href = '/BitCoding/pageprofile.bit';
			}
		},
	});
}

function getData() {
	return new Promise((resolve, reject) => {
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
				} else {
					$(".user_info_type").css("color", "#6C63FF");
				}

				resolve(); // 데이터를 성공적으로 가져온 경우 resolve 호출
			},
			error: function(error) {
				reject(error); // 에러가 발생하면 reject 호출
			}
		});
	});
}

function getLikeDataALL() {
	return new Promise((resolve, reject) => {
		console.log('겟데이터 들어옴');

		$.ajax({
			url: 'getLikeALL.bit', // 서블릿 URL
			type: 'post',  // HTTP 요청 방식
			data: {},
			success: function(data) {
				user_like = data;
				console.log(user_like);
				resolve(); // 데이터 로드 완료 후 Promise 성공 처리
			},
			error: function(status, error) {
				console.error('AJAX 요청 실패:', status, error);
				reject(error); // 에러 발생 시 Promise 실패 처리
			}
		});
	});
}

// 랭킹 정렬 함수
function getRanking(like, type, title) {

	let sortedLikes;

	if (type === 'Comment') {
		// like를 Comment 기준으로 좋아요 수 내림차순 정렬
		sortedLikes = like
			.sort((a, b) => b.co_like - a.co_like);

		if (title === 'ALL') {
			// Comment 타입 전체를 리턴
			return sortedLikes.slice(0, 5);;
		} else if (title === 'Thinking') {
			// Comment 타입 중 Thinking만 필터링하여 리턴
			return sortedLikes.filter(item => item.mem_type === 'Thinking').slice(0, 5);;
		} else if (title === 'Feeling') {
			// Comment 타입 중 Feeling만 필터링하여 리턴
			return sortedLikes.filter(item => item.mem_type === 'Feeling').slice(0, 5);;
		}
	}
	else if (type === 'Post') {
		// like를 Post 기준으로 좋아요 수 내림차순 정렬
		sortedLikes = like
			.sort((a, b) => b.po_like - a.po_like);

		if (title === 'ALL') {
			// Post 타입 전체를 리턴
			return sortedLikes.slice(0, 5);;
		} else if (title === 'Thinking') {
			// Post 타입 중 Thinking만 필터링하여 리턴
			return sortedLikes.filter(item => item.mem_type === 'Thinking').slice(0, 5);;
		} else if (title === 'Feeling') {
			// Post 타입 중 Feeling만 필터링하여 리턴
			return sortedLikes.filter(item => item.mem_type === 'Feeling').slice(0, 5);;
		}
	}
}

function drawRankTop(nick, count, idx) {
	const newPostHTML = `
	<div class="top-ranking">${nick}</div>
	<div class="top-ranking-info">좋아요 ${count}회</div>
	<ul class="ranking-list">
		<li class="ranking-item"><span class = "rank">${idx}.&nbsp;</span> <span class="nick">${nick}</span> <span class="likes">좋아요 ${count}회</span></li>
	</ul>
    `;
	return newPostHTML;
}

function drawRankList(nick, count, idx) {
	const newPostHTML = `
	<li class="ranking-item"><span class = "rank">${idx}.&nbsp;</span> <span class="nick">${nick}</span> <span class="likes">좋아요 ${count}회</span></li>
	`;
	return newPostHTML
}

function prepare() {
    const co_all = getRanking(user_like, "Comment", "ALL");
    const co_th = getRanking(user_like, "Comment", "Thinking");
    const co_fl = getRanking(user_like, "Comment", "Feeling");
    const po_all = getRanking(user_like, "Post", "ALL");
    const po_th = getRanking(user_like, "Post", "Thinking");
    const po_fl = getRanking(user_like, "Post", "Feeling");

    const co_all_top = $('.ranking-column.comments-likes .tf-all-title').closest('.ranking-column').find('.ranking-content');
    const co_th_top = $('.ranking-column.comments-likes .thinking-title').closest('.ranking-column').find('.ranking-content');
    const co_fl_top = $('.ranking-column.comments-likes .feeling-title').closest('.ranking-column').find('.ranking-content');
    const po_all_top = $('.ranking-column.posts-likes .tf-all-title').closest('.ranking-column').find('.ranking-content');
    const po_th_top = $('.ranking-column.posts-likes .thinking-title').closest('.ranking-column').find('.ranking-content');
    const po_fl_top = $('.ranking-column.posts-likes .feeling-title').closest('.ranking-column').find('.ranking-content');

    function appendRankings(topContainer, listContainerSelector, data, isPost = false) {
        if (data.length === 0) return; // 데이터가 비어 있을 경우 처리

        // 첫 번째 항목 추가 후 .ranking-list가 생성됨
        const firstItem = data[0];
        const count = isPost ? firstItem.po_like : firstItem.co_like;
        topContainer.append(drawRankTop(firstItem.user_id, count, 1));

        // .ranking-list가 생성되었으므로 다시 찾아서 추가 작업 진행
        const listContainer = topContainer.find(listContainerSelector);

        // 나머지 항목 추가
        for (let i = 1; i < data.length; i++) {
            const item = data[i];
            const count = isPost ? item.po_like : item.co_like;
            listContainer.append(drawRankList(item.user_id, count, i + 1));
        }
    }

    // 각 그룹에 대해 appendRankings 호출
    appendRankings(co_all_top, '.ranking-list', co_all);
    appendRankings(co_th_top, '.ranking-list', co_th);
    appendRankings(co_fl_top, '.ranking-list', co_fl);
    appendRankings(po_all_top, '.ranking-list', po_all, true);
    appendRankings(po_th_top, '.ranking-list', po_th, true);
    appendRankings(po_fl_top, '.ranking-list', po_fl, true);
}
