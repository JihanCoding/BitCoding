<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TOF</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="assets/js/index.js"></script>
<!-- Font Awesome CSS -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<!-- Custom CSS -->
<link rel="stylesheet" href="assets/css/index.css">
</head>
<body>
	<!-- 헤더 -->
	<header>
		<div class="header-center">
			<div class="header-left">
				<h1 class="logo">
					<span id="thinkingText">Thinking?</span> <span id="feelingText">Feeling!</span>
				</h1>
			</div>
			<div class="header-right">
				<a class="login-btn">로그인</a>

				<a class="signup-btn" id="gojoin">회원가입</a>
			</div>
		</div>
	</header>

	<!-- 메인 섹션 -->
	<section class="hero-section">
		<div class="hero-slides">
			<!-- 슬라이드 이미지 1 -->
			<div class="hero-slide"
				style="background-image: url('/BitCoding/assets/images/yonghyun.jpg');"></div>
			<!-- 슬라이드 이미지 2 -->
			<div class="hero-slide"
				style="background-image: url('/BitCoding/assets/images/isol.jpg');"></div>
			<!-- 슬라이드 이미지 3 -->
			<div class="hero-slide"
				style="background-image: url('/BitCoding/assets/images/jihan.jpg');"></div>
			<!-- 슬라이드 이미지 1 -->
			<div class="hero-slide"
				style="background-image: url('/BitCoding/assets/images/yonghyun.jpg');"></div>
			<!-- 더 추가할 이미지가 있다면 추가 -->
		</div>

		<div class="hero-content">
			<p class="sub-text">익명으로 나누는 진심 어린 대화와 따뜻한 공감의 공간</p>
			<h2 class="main-title">
				혼자가 아닌 우리,<br>함께 고민을 나누는 시간
			</h2>
			<div class="button-container">
				<button class="kakao-btn">
					<i class="fas fa-comment"></i> 카카오로 3초만에 가입하기
				</button>
				<button class="email-btn">이메일로
					가입하기</button>
			</div>
		</div>
	</section>
</body>
</html>
