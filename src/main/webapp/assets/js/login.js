
$(document).ready(function() {
	$('#logoButton').on('click', pageMoveHome);
	$('.kakao-button').on('click', kakaoalert);

	$("#login-form").on('submit', function(event) {
		event.preventDefault();
		check();
	});
});
function pageMoveHome() {
	window.location.href = '/BitCoding/home.bit';
}

function kakaoalert() {
	Swal.fire({
		title: 'infomation',
		text: '준비중인 서비스입니다.',
		icon: 'info',
		confirmButtonText: '확인'
	});
}

function check() {
	console.log($('input[name="login_email"]').val());
	$.ajax({
		url: 'logindb.bit',
		type: 'post',
		data: {
			'email': $('input[name="login_email"]').val(),
			'password': $('input[name="login_password"]').val()
		},
		success: function(res) {
			if (res == "true") {
				window.location.href = '/BitCoding/main.bit';
			}
			else {
				Swal.fire({
					title: '로그인 실패',
					text: '이메일 또는 비밀번호가 올바르지 않습니다.',
					icon: 'error',
					confirmButtonText: '확인',
					confirmButtonColor: '#d33' // 확인 버튼 색상 (선택 사항)
				});
				$('#email_check').val("");
				$('input[name="login_password"]').val("");
			}
		}
	});
}