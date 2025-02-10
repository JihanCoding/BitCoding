$(document).ready(function() {
	$('#gojoin').on('click', pageMoveJoin);
	$('.login-btn').on('click', pageMoveLogin);
	$('.logo').on('click', function() {
		location.reload(); // 페이지 새로고침
	});

	$('.kakao-btn').on('click', kakaoalert);
	$('.email-btn').on('click', pageMoveJoin)

	const $slides = $('.hero-slides');
	const $slide = $('.hero-slide');
	const totalSlides = $slide.length;
	let currentIndex = 0;

	function moveToNextSlide() {
		currentIndex++;

		// 슬라이드를 이동
		$slides.css('transition', 'transform 1s ease');
		$slides.css('transform', `translateX(-${currentIndex * 100}%)`);

		// 마지막 슬라이드에 도달했을 때 첫 번째 슬라이드로 즉시 이동
		if (currentIndex === totalSlides - 1) {
			setTimeout(() => {
				$slides.css('transition', 'none');
				$slides.css('transform', 'translateX(0)');
				currentIndex = 0;
			}, 1000); // 이동 애니메이션 시간과 동일하게 설정
		}
	}

	// 3초마다 슬라이드 이동
	setInterval(moveToNextSlide, 4000);
});
function pageMoveJoin() {
	window.location.href = '/BitCoding/join.bit';
}

function pageMoveLogin() {
	window.location.href = '/BitCoding/login.bit';
}

function kakaoalert() {
	Swal.fire({
		title: 'infomation',
		text: '준비중인 서비스입니다.',
		icon: 'info',
		confirmButtonText: '확인'
	});
}