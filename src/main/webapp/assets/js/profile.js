let user_info = {};
let percent = "";
$(document).ready(function() {
	prepare();

	$('.delete-button').on('click', function() {
		Swal.fire({
			title: '회원탈퇴',
			html: '정말로 회원탈퇴를 진행하시겠습니까?<br>탈퇴 시 모든 데이터가 삭제됩니다.',
			icon: 'warning',
			showCancelButton: true, // 취소 버튼 표시
			confirmButtonText: '탈퇴',
			cancelButtonText: '취소',
			confirmButtonColor: '#FF5C5C', // 탈퇴 버튼 색상
			cancelButtonColor: '#6C63FF' // 취소 버튼 색상
		}).then((result) => {
			if (result.isConfirmed) {
				// 탈퇴를 확인한 경우 실행할 코드
				deleteMem();
			} else {
				// 취소 버튼을 클릭한 경우 실행할 코드 (필요한 경우)
				console.log('회원탈퇴가 취소되었습니다.');
			}
		});
	});
	// 닉네임 중복 체크
	const nickInput = $('#newPwCheck');
	nickInput.on("input", checkEqaul);
	$(".user-info").on('submit', function(event) {
		event.preventDefault();
		console.log("세션 pw", user_info.pw);
		console.log("기존 pw", $('input[name="nowPw"]').val());
		console.log("변경 pw", $('input[name="newPw"]').val());
		console.log("변경확인 pw", $('input[name="newPwCheck"]').val());
		if (user_info.pw === $('input[name="nowPw"]').val() && $('#result').text() === '비밀번호가 일치합니다.') {
			check();
		}
		else if ($('#result').text() !== '비밀번호가 일치합니다.') {
			Swal.fire({
				title: '비밀번호 오류',
				text: '새 비밀번호가 일치하지 않습니다.',
				icon: 'error',
				confirmButtonText: '확인',
				confirmButtonColor: '#d33' // 확인 버튼 색상 (선택 사항)
			});
		}
		else if (user_info.pw !== $('input[name="nowPw"]').val()) {
			Swal.fire({
				title: '비밀번호 오류',
				text: '기존 비밀번호가 일치하지 않습니다.',
				icon: 'error',
				confirmButtonText: '확인',
				confirmButtonColor: '#d33' // 확인 버튼 색상 (선택 사항)
			});
		}
	});
	let hideTimeout;
	$('.logo').on('click', function() {
		console.log('클릭');
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
	$('#logout').on('click', logout);

	$('.toggle-header').on("click", function() {
		console.log("이벤트 들어옴");
		$('.pwchange').toggleClass("active"); // .pwchange에 active 클래스 추가/제거
		$(this).text($('.pwchange').hasClass("active")
			? "비밀번호 변경 🔼" // 열렸을 때
			: "비밀번호 변경 🔽" // 닫혔을 때
		);
	});
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

function getPost(idx, category, tf, title, content, postimage, tags, date, count) {

	const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#e74c3c"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
	const newPostHTML = `
        <div class="post" data-category="${category}" data-id="${idx}">
    <div class="post-header">
        <div class="post-date">작성일: ${date}</div>
    </div> <!-- post-header 닫는 태그 -->

    <div class="post-title">${title}</div>
    <div class="post-content">${content}</div>
    <img class="post-image" src="assets/images/profiles/${postimage}" onerror="this.onerror=null; this.src='assets/images/nomal.webp';">

    <div class="post-tags">
        <div class="tags">
            <span style="font-weight: bold;">#${category}</span>
            <span style="font-weight: bold;">#${tf}</span>
            ${tags}
        </div>
        <div class="reaction-container">
            <span class="like-icon">${icon}</span><span class="like-count">${count}</span>
        </div>
    </div> <!-- post-tags 닫는 태그 -->
</div> <!-- post 닫는 태그 -->

    `;

	$(".postbox").append(newPostHTML);
	console.log($(".postbox"));
}

function prepare() {
	getData(getRank);
	$(".postbox").empty();
	console.log('prepare 진입');

	$.ajax({
		url: 'getPost.bit', // 서블릿 URL
		type: 'GET', // HTTP 요청 방식
		dataType: 'json', // 응답 데이터 형식
		success: function(data) {
			// 서블릿에서 받은 데이터를 사용
			if (data) {
				data.forEach(item => {

					if (user_info.nickname === item.nick) {
						getPost(item.post_idx, item.category, item.post_type, item.post_title, item.post_content, item.post_file, item.post_tag, item.create_at, item.post_like);
						console.log(item.post_idx);
					}
				});
				if (user_info.tf == "Feeling") {
					$(".user_info_type").css("color", "#FF5C5C");
				} else {
					$(".user_info_type").css("color", "#6C63FF");
				}
			}
		},
		error: function(error) {
			console.error("AJAX 호출 오류:", error);
		}
	});
}

function check() {
	$.ajax({
		url: 'updateInfo.bit',
		type: 'post',
		data: {
			'email': user_info.email,
			'password': $('input[name="newPwCheck"]').val()
		},
		success: function(res) {
			if (res == "true") {
				Swal.fire({
					title: 'information',
					text: '비밀번호 변경 성공하셨습니다.',
					icon: 'success',
					confirmButtonText: '확인',
					confirmButtonColor: '#d33' // 확인 버튼 색상 (선택 사항)
				});
				$('input[name="nowPw"]').val("");
				$('input[name="newPw"]').val("");
				$('input[name="newPwCheck"]').val("");

				$('.pwchange').toggleClass("active"); // .pwchange에 active 클래스 추가/제거
				$(".toggle-header").text($('.pwchange').hasClass("active")
					? "비밀번호 변경 🔼" // 열렸을 때
					: "비밀번호 변경 🔽" // 닫혔을 때
				);
			}
		}
	});
}

function checkEqaul() {
	let result = $('#result');
	if ($('input[name="newPwCheck"]').val() === $('input[name="newPw"]').val()) {
		result.html('비밀번호가 일치합니다.')
			.css({
				'color': '#00cc84', // 녹색
				'font-size': '13px',
				'margin': '0',
				'padding': '0',
				'font-weight': 'bold'
			})
	}
	else {
		result.html('비밀번호가 일치하지 않습니다.')
			.css({
				'color': '#e53e3e', // 붉은색
				'font-size': '13px',
				'margin': '0',
				'padding': '0',
				'font-weight': 'bold'
			});
	}
}

// getLikeALL 함수에서 콜백을 사용하여 전체 좋아요 수를 가져옴
function getLikeALL(type, callback) {
	let po_like = 0;
	let co_like = 0;

	$.ajax({
		url: 'getLikeALL.bit',
		type: 'GET',
		data: {},
		success: function(data) {
			if (data) {
				data.forEach(item => {
					po_like += item.po_like;
					co_like += item.co_like;
				});
				console.log("po_like 전체", po_like);
				console.log("co_like 전체", co_like);
			}

			// 요청한 type에 따라 값 전달
			if (type === "po") {
				callback(po_like);
			} else if (type === "co") {
				callback(co_like);
			}
		}
	});
}

// getRank 함수에서 getLikeALL 호출 후 콜백으로 처리
function getRank() {
	$.ajax({
		url: 'getLikeData.bit',
		type: 'GET',
		data: { 'user_id': user_info.nickname },
		success: function(data) {
			// post 좋아요 정보 가져오기
			getLikeALL("po", function(po_like_total) {
				$('.post-rank').find('.post-like').text(data.po_like);
				$('.post-rank').find('.post-percent').text(determinePreciseRank(data.po_like, po_like_total));
				$('.post-rank').find('.progress').css('width', percent+"%");
			});

			// comment 좋아요 정보 가져오기
			getLikeALL("co", function(co_like_total) {
				$('.comment-rank').find('.comment-like').text(data.co_like);
				$('.comment-rank').find('.comment-percent').text(determinePreciseRank(data.co_like, co_like_total));
				$('.comment-rank').find('.progress').css('width', percent+"%");
			});
		}
	});
}

// getData 함수에서 getRank를 콜백으로 호출
function getData(callback) {
	$.ajax({
		url: 'getData.bit', // 서블릿 URL
		type: 'post',  // HTTP 요청 방식
		dataType: 'json', // 응답 데이터 형식
		success: function(data) {
			// 서블릿에서 받은 데이터를 사용
			user_info.nickname = data.nick;
			user_info.pw = data.pw;
			user_info.email = data.email;
			console.log('닉네임', user_info.nickname);

			// 콜백 함수 실행 (getRank)
			callback();
		}
	});
}

function calculateRankPercentage(myLikes, totalLikes) {
	if (totalLikes === 0) return 0; // 전체 좋아요가 0일 때를 처리
	return (myLikes / totalLikes) * 100;
}

function determinePreciseRank(myLikes, totalLikes) {
	const percentage = calculateRankPercentage(myLikes, totalLikes);

	if (percentage >= 95) {
		percent = "5";
		return "상위 5%";
	} else if (percentage >= 90) {
		percent = "10";
		return "상위 10%";
	} else if (percentage >= 85) {
		percent = "15";
		return "상위 15%";
	} else if (percentage >= 80) {
		percent = "20";
		return "상위 20%";
	} else if (percentage >= 75) {
		percent = "25";
		return "상위 25%";
	} else if (percentage >= 70) {
		percent = "30";
		return "상위 30%";
	} else if (percentage >= 60) {
		percent = "40";
		return "상위 40%";
	} else if (percentage >= 50) {
		percent = "50";
		return "상위 50%";
	} else {
		percent = "50";
		return "하위 50%";
	}

}

function deleteMem() {
	$.ajax({
		url: 'deleteMem.bit', // 서블릿 URL
		type: 'post',  // HTTP 요청 방식
		success: function(data) {
			if (data == "true") {
				Swal.fire({
					title: 'information',
					text: '회원탈퇴 완료.',
					icon: 'success',
					confirmButtonText: '확인',
					confirmButtonColor: '#6C63FF' // 확인 버튼 색상 (선택 사항)
				}).then((result) => {
					if (result.isConfirmed) {
						$.ajax({
							url: 'logout.bit',// 요청 URL주소
							type: 'get',// GET POST
							data: {
							},
							success: function(res) {

								if (res == "true") {
									window.location.href = '/BitCoding/home.bit';
								}
							},
						});
					}
				});
			}
			else {
				console.log("회원가입실패");
			}
		}
	});
}