// join.js
// FormData 객체 생성
var formData = new FormData();

let user_info = {};
let isCheck = true;
let nextPage = null;
$(document).ready(function() {
	$('.kakao-button').on('click', kakaoalert);
	$('#logoButton').on('click', function() {
		window.location.href = '/BitCoding/home.bit';
	});
	// 프사 미리보기
	$('#profilePicture').on('change', function(event) {
		const file = event.target.files[0];

		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();

			reader.onload = function(e) {
				$('#previewImage').attr('src', e.target.result).show(); // jQuery로 이미지 미리보기 설정 및 표시
			};

			reader.readAsDataURL(file); // 파일 내용을 Data URL로 변환하여 미리보기 설정
		} else {
			Swal.fire({
				title: 'warning',
				text: 'Please upload a valid image file.',
				icon: 'warning',
				confirmButtonText: '확인'
			});
			$('#profilePicture').val('');
		}
	});


	// 이메일 가입 폼을 처음에는 숨긴 상태로 설정
	$("#email-form").hide();

	// "이메일로 가입하기" 버튼 클릭 시 슬라이드다운/업 애니메이션
	$("#email-signup-button").click(function() {
		$("#email-form").slideToggle(500);  // 0.5초 동안 슬라이드 토글
		$(".table-container").slideToggle(500);
	});

	// 이메일 가입 폼을 처음에는 숨긴 상태로 설정
	$(".table-container").hide();

	// 모달 배경 클릭 시 닫기
	$(".modal-backdrop").on("click", function() {
		$("#join-modal2").fadeOut(300);
		$(this).fadeOut(300);
	});
	// 모달 닫기 버튼 클릭 시
	$(".close-modal-button").on("click", function() {
		$("#join-modal2").fadeOut(300);
		$(".modal-backdrop").fadeOut(300);
	});

	const today = new Date().toISOString().split('T')[0]; // 현재 날짜를 "YYYY-MM-DD" 형식으로
	// flatpickr 초기화
	$('#birth').flatpickr({
		maxDate: today, // 최대 선택 가능 날짜를 오늘로 설정
		dateFormat: "Y-m-d" // 날짜 형식을 "YYYY-MM-DD"로 설정
	});

	// 회원가입 제출
	$("#join-form").on('submit', function(event) {
		check(event);
	});

	// T/F테스트 제출
	$("#join-form2").on('submit', function(event) {
		$("#join-modal2").fadeOut(300);
		$(".modal-backdrop").fadeOut(300);
		event.preventDefault();
	});

	// 이메일 형식 확인 함수
	function validateEmailFormat(email) {
		// 이메일 형식을 위한 정규 표현식
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		return emailRegex.test(email); // 이메일 형식에 맞으면 true, 아니면 false 반환
	}

	// 이메일 중복 체크
	const input = $('#email_check');
	input.on("input", emailError);

	function emailError() {
		console.log('에러이메일들어옴');
		$.ajax({
			url: 'checkEmail.bit',
			type: 'post',
			data: {
				'email': input.val()
			},
			success: function(res) {
				const p = $('#result')

				if (res === "true" && validateEmailFormat(input.val())) {
					// $('선택자').html('HTML코드') : 내부 코드 덮어쓰기
					// $('선택자').html.css('속성명', '속성값') : 스타일 속성 값 조정
					p.html('사용가능한 이메일 입니다.')
						.css({
							'color': '#00cc84', // 녹색
							'font-size': '13px',
							'margin': '0',
							'padding': '0',
							'font-weight': 'bold'
						})

				}
				else if (res === "false" && validateEmailFormat(input.val())) {
					p.html('중복된 이메일 입니다.')
						.css({
							'color': '#e53e3e', // 붉은색
							'font-size': '13px',
							'margin': '0',
							'padding': '0',
							'font-weight': 'bold'
						});
				}
				else {
					p.html('올바른 이메일 형식을 입력하세요.')
						.css({
							'color': '#e53e3e', // 붉은색
							'font-size': '13px',
							'margin': '0',
							'padding': '0',
							'font-weight': '500'
						});
				}
			}
		});
	}

	// 닉네임 중복 체크
	const nickInput = $('#nick_check');
	nickInput.on("input", nickError);

	function nickError() {
		$.ajax({
			url: 'checkNick.bit',
			type: 'post',
			data: {
				'nick': nickInput.val()
			},
			success: function(res) {
				const p = $('#checkNick')
				console.log("결과값",res);
				if (res === "true") {
					// $('선택자').html('HTML코드') : 내부 코드 덮어쓰기
					// $('선택자').html.css('속성명', '속성값') : 스타일 속성 값 조정
					p.html('사용가능한 닉네임 입니다.')
						.css({
							'color': '#00cc84', // 녹색
							'font-size': '13px',
							'margin': '0',
							'padding': '0',
							'font-weight': 'bold'
						})

				}
				else if (res === "false") {
					p.html('사용 불가능한 닉네임 입니다.')
						.css({
							'color': '#e53e3e', // 붉은색
							'font-size': '13px',
							'margin': '0',
							'padding': '0',
							'font-weight': 'bold'
						});
				}
				else {
					p.html('사용 불가능한 닉네임 입니다.')
						.css({
							'color': '#e53e3e', // 붉은색
							'font-size': '13px',
							'margin': '0',
							'padding': '0',
							'font-weight': 'bold'
						});
				}
			}
		});
	}

	const questions = [
		"나는 결정을 내릴 때 논리적이고 객관적인 판단을 중시한다.",     // T
		"나는 타인의 감정을 고려하여 결정을 내린다.",                 // F
		"나는 문제를 해결할 때 감정보다 사실에 근거한 접근을 선호한다.",  // T
		"나는 다른 사람과의 관계에서 공감과 이해가 중요하다고 생각한다.",  // F
		"나는 감정보다 사실과 증거를 중시하는 편이다.",                 // T
		"나는 다른 사람의 감정을 상하게 하지 않도록 신경을 많이 쓰는 편이다.", // F
		"나는 결정을 내릴 때 감정적인 요소는 배제하려고 한다.",         // T
		"나는 의사결정을 할 때 타인의 감정이 중요하다고 생각한다.",       // F
		"나는 갈등 상황에서 논리적으로 해결책을 찾으려 한다.",           // T
		"나는 갈등 상황에서 상대방의 감정을 이해하고 해결하려고 한다."      // F
	];

	const $container = $("#questionContainer");
	$.each(questions, function(index, question) {
		let rowHtml = `<tr>
                           <td class="question">${index + 1}. ${question}</td>`; // 질문 셀 추가

		// 선택 항목 5개 추가
		for (let i = 1; i <= 5; i++) {
			rowHtml += `<td class="options">
                            <input type="radio" name="q${index}" value="${i}" required>
                        </td>`;
		}

		rowHtml += `</tr>`; // 행 닫기
		$container.append(rowHtml);
	});

});
function kakaoalert() {
	Swal.fire({
		title: 'infomation',
		text: '준비중인 서비스입니다.',
		icon: 'info',
		confirmButtonText: '확인'
	});
}
/* TF 검사표 계산 로직*/
function calculateTFScore() {

	// T와 F 문항을 구분하여 인덱스 배열 정의
	const T_questions = [0, 2, 4, 6, 8]; // T 성향 문항 (index 0부터 시작)
	const F_questions = [1, 3, 5, 7, 9]; // F 성향 문항

	console.log("tf검사로직");
	let T_score = 0; // T 성향 점수
	let F_score = 0; // F 성향 점수

	// T 성향 문항 점수 계산
	T_questions.forEach(function(index) {
		const score = parseInt($(`input[name="q${index}"]:checked`).val()) || 0;
		T_score += score;
	});

	// F 성향 문항 점수 계산
	F_questions.forEach(function(index) {
		const score = parseInt($(`input[name="q${index}"]:checked`).val()) || 0;
		F_score += score;
	});

	// 결과 출력
	console.log("T 점수:", T_score);
	console.log("F 점수:", F_score);

	// T와 F 점수를 비교하여 결과 표시
	if (T_score > F_score) {
		formData.append('tf', 'Thinking');
	} else if (F_score > T_score) {
		formData.append('tf', 'Feeling');
	} else {
		formData.append('tf', 'Feeling');
	}
}
function sendData(event) {
	const nick = formData.get('nickname');
	$.ajax({
		url: 'joindb.bit',// 요청 URL주소
		type: 'post',// GET POST
		data: formData,
		processData: false, // 파일 데이터 전송 시 필수 설정
		contentType: false, // 파일 데이터 전송 시 필수 설정
		success: function(res) {
			// 요청이 성공해서, 응답이 이루어진 후에 실행되는 함수
			// 응답 받은 데이터가 자동으로 res에 담김 
			if (res == "true") {
				$.ajax({
					url: 'createUL.bit',
					type: 'post',
					data: {
						"user_id": nick
					},
					success: function() {

					}
				});
				window.location.href = "/BitCoding/home.bit"
				console.log("성공");
			}
			else {
			}
		},
		error: function(request, errorcode, error) {
			console.log("실패입니다!");
			console.log(request);
			console.log(errorcode);
			console.log(error);
		}
	});
}

/* 첫 페이지 제출이 완료 됐을 때*/
function setData(event) {
	console.log($('#result').text());
	console.log($('#checkNick').text());
	if ($('#result').text() === '사용가능한 이메일 입니다.' && $('#checkNick').text() === '사용가능한 닉네임 입니다.') {
		console.log("맞잖아");
		isCheck = false;
		formData.append('email', $('input[name="join_email"]').val());
		formData.append('name', $('input[name="join_name"]').val());
		formData.append('password', $('input[name="join_password"]').val());
		formData.append('nickname', $('input[name="join_nick"]').val());
		formData.append('gender', $('select[name="join_gender"]').val());
		formData.append('birth', $('input[name="join_birth"]').val());
		formData.append('phoneNumber', $('input[name="join_phoneNumber"]').val());
		// 파일 데이터 추가 (프로필 사진)       
		const file = $('#profilePicture')[0].files[0];
		if (file) {
			// 유저가 이미지를 선택한 경우
			formData.append('file', file);
		} else {
			// 유저가 이미지를 선택하지 않은 경우, 기본 이미지를 추가
			const filePath = "/assets/images/nomal.webp";

			fetch(filePath)
				.then(response => {
					if (response.ok) {
						// 파일이 존재하는 경우 Blob 객체로 변환
						return response.blob();
					} else {
						throw new Error('기본 이미지 파일이 존재하지 않음');
					}
				})
				.then(blob => {
					// Blob 객체를 File 객체로 변환
					const defaultFile = new File([blob], "nomal.webp", { type: blob.type });
					formData.append('file', defaultFile);
					console.log('기본 이미지를 formData에 추가했습니다.');
				})
				.catch(error => {
					console.error('Error:', error.message);
				});
		}

		$(".modal-backdrop").fadeIn(300);
		$("#join-modal2").fadeIn(300);
	}
	else if ($('#result').text() === '중복된 이메일 입니다.') {
		showShakeEffect();
		event.preventDefault();
		Swal.fire({
			title: '전달 실패',
			text: '이메일 또는 닉네임이 올바르지 않습니다.',
			icon: 'error',
			confirmButtonText: '확인',
			confirmButtonColor: '#d33' // 확인 버튼 색상 (선택 사항)
		});
	}
	else {
		console.log("리절트닉");
		showShakeEffectNick();
		event.preventDefault();
		Swal.fire({
			title: '전달 실패',
			text: '이메일 또는 닉네임이 올바르지 않습니다.',
			icon: 'error',
			confirmButtonText: '확인',
			confirmButtonColor: '#d33' // 확인 버튼 색상 (선택 사항)
		});
	}

	if ($('#checkNick').text() === '사용 불가능한 닉네임 입니다.') {
		
	}
}
function showShakeEffect() {
	const messageElement = $('#result');
	// 떨림 효과 클래스 추가
	messageElement.removeClass('shake');

	// 애니메이션이 끝난 후 떨림 효과 클래스 제거
	setTimeout(() => {
		messageElement.addClass('shake');
	}, 100); // 애니메이션 지속 시간과 동일하게 설정
}

function showShakeEffectNick() {
	const messageElement = $('#checkNick');
	// 떨림 효과 클래스 추가
	messageElement.removeClass('shakes');

	// 애니메이션이 끝난 후 떨림 효과 클래스 제거
	setTimeout(() => {
		messageElement.addClass('shakes');
	}, 100); // 애니메이션 지속 시간과 동일하게 설정
}
function check(event) {
	if (isCheck === true) {
		event.preventDefault();
		setData(event);
	}
	else {
		event.preventDefault();
		calculateTFScore();
		sendData(event);
	}
}