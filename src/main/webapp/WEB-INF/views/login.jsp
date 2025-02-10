<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TOF</title>
<link rel="stylesheet" href="assets/css/login.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="assets/js/login.js"></script>
</head>
<body>
	<div class="container">
		<header class="header">
			<div class="header-center">
				<h1 class="logo" id="logoButton">
					<span id="thinkingText">Thinking?</span> <span id="feelingText">Feeling!</span>
				</h1>
			</div>
		</header>

		<main class="main">
			<div class="login-form">
				<div class="content-wrapper">
					<h1>로그인</h1>

					<div id="email-form" class="email-form">
						<form id="login-form">
							<label for="email">이메일</label> <input type="email"
								id="email_check" name="login_email"
								placeholder="example@gmail.com" required> 
							<label for="password">비밀번호</label> <input type="password"
								name="login_password" required>
							<button id="email-signup-button" type = "submit" class="email-button">이메일로
						시작하기</button>
						</form>
					</div>
					<div class="divider">또는</div>
					<button class="kakao-button">
						<svg class="kakao-icon" width="40" height="40" viewBox="0 0 24 24"
							fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#3C1E1E"
								d="M12 2C6.48 2 2 5.95 2 10.62c0 2.22 1.1 4.21 2.88 5.62l-.7 4.41c-.1.61.5 1.1 1.05.82l4.95-2.47c.61.09 1.24.14 1.82.14 5.52 0 10-3.95 10-8.62C22 5.95 17.52 2 12 2Z" />
                        </svg>
						카카오로 시작하기
					</button>
					<div class="login-prompt">
						<span>아직 회원이 아니신가요?</span> <a href="join.bit" class="login-link">회원가입하기<span
							class="arrow">〉</span></a>
					</div>
					<div class="footer">
						TEAM BitCoding | 스마트인재개발원 | DCX기반 빅데이터 분석서비스 개발자과정 | <br> 목포시
						산정로212번길 13 | 010 9547 1598<br> Copyright 2024. BitCoding All
						rights reserved.
					</div>
				</div>
			</div>
		</main>
	</div>
</body>
</html>
