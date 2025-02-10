<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TOF</title>
<link rel="stylesheet" href="assets/css/rank.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/js/rank.js"></script>
</head>
<body>
	<!-- 로딩 화면 -->
	<div id="loading-screen">
		<div class="loader"></div>
		<!-- 로딩 애니메이션 -->
	</div>
	<!-- 랭킹 페이지 제목 -->
	<!-- 헤더 -->
	<header>
		<div class="header-center">
			<div class="header-left">
				<h1 class="logo">
					<span id="thinkingText">Thinking?</span> <span id="feelingText">Feeling!</span>
				</h1>
				<div class="header-links">
					<a href="pageRanking.bit" class="active">랭킹</a> <a href="#">자유게시판</a>
				</div>
			</div>
			<div class="header-right">
				<div class="myprofile">
					<div class="profile-container">
						<a href="#" class="profile-icon" id="profileImage"
							aria-label="프로필"> <img
							src="assets/images/profiles/${member.profile}" alt="Profile">
						</a>
						<div class="dropdown-menu" id="dropdownMenu">
							<button class="dropdown-item" id="myPage">마이페이지</button>
							<button class="dropdown-item" id="logout">로그아웃</button>
						</div>
					</div>
					<span class="user_info_nick"> ${member.nick}</span> <span
						class="user_info_type">${member.mem_type}</span> <a href="#"
						class="icon notification-icon" aria-label="알림"> <svg
							xmlns="http://www.w3.org/2000/svg" width="40" height="40"
							fill="currentColor" viewBox="0 0 24 24">
                        <path
								d="M12 2a7 7 0 00-7 7v5H4v2h16v-2h-1v-5a7 7 0 00-7-7zm-3 16h6a3 3 0 01-6 0z" />
                    </svg>
					</a>
				</div>
			</div>
	</header>
	<!-- 배너 -->
	<div class="banner">
		<h2>Popular Right Now!</h2>
		<p>Catch up on the posts everyone’s engaging with</p>
	</div>

	<!-- 탭 버튼 섹션 -->
	<div class="tab-buttons">
		<button class="tab-button active" data-tab="posts-likes">Post
			Likes</button>
		<button class="tab-button" data-tab="comments-likes">Comment
			Likes</button>
	</div>
	<div class="content-wrapper">
		<!-- 랭킹 섹션 -->

		<div class="ranking-container">
			<!-- 통합 카테고리 - Post Likes 관련 콘텐츠 -->
			<div class="ranking-column posts-likes">
				<div class="category-title">
					<span class="tf-all-title">T/F All</span>
				</div>
				<div class="ranking-content">
					<!-- 이곳에 내용 추가 -->
				</div>
			</div>

			<div class="ranking-column posts-likes">
				<div class="category-title">
					<span class="thinking-title">Thinking</span>
				</div>
				<div class="ranking-content">
					<!-- 이곳에 내용 추가 -->
				</div>
			</div>

			<div class="ranking-column posts-likes">
				<div class="category-title">
					<span class="feeling-title">Feeling</span>
				</div>
				<div class="ranking-content">
					<!-- 이곳에 내용 추가 -->
				</div>
			</div>
			<!-- 여기까지 - Post Likes 관련 콘텐츠 -->

			<!-- 통합 카테고리 - Comments Likes 관련 콘텐츠 -->
			<div class="ranking-column comments-likes">
				<div class="category-title">
					<span class="tf-all-title">T/F All</span>
				</div>
				<div class="ranking-content">
					<!-- 이곳에 내용 추가 -->
				</div>
			</div>

			<div class="ranking-column comments-likes">
				<div class="category-title">
					<span class="thinking-title">Thinking</span>
				</div>
				<div class="ranking-content">
					<!-- 이곳에 내용 추가 -->
				</div>
			</div>

			<div class="ranking-column comments-likes">
				<div class="category-title">
					<span class="feeling-title">Feeling</span>
				</div>
				<div class="ranking-content">
					<!-- 이곳에 내용 추가 -->
				</div>
			</div>
		</div>
		<!-- 여기까지 - Comments Likes 관련 콘텐츠 -->

		<!-- footer ! -->
		<div class="footer">
			TEAM BitCoding | 스마트인재개발원 | DCX기반 빅데이터 분석서비스 개발자과정 | <br> 목포시
			산정로212번길 13 | 010 9547 1598<br> Copyright 2024. BitCoding All
			rights reserved.
		</div>
</body>
</html>