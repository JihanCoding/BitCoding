$(document).ready(function() {
	let hideTimeout;

	$('.profile-container').on('mouseover', function() {
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