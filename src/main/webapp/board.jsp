<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TOF</title>
<link rel="stylesheet" href="assets/css/board.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/js/board.js"></script>
</head>
<body>
	<!-- 랭킹 페이지 제목 -->
	<!-- 헤더 -->
	<header>
		<div class="header-center">
			<div class="header-left">
				<h1 class="logo">
					<span id="thinkingText">Thinking?</span> <span id="feelingText">Feeling!</span>
				</h1>
				<div class="header-links">
					<a href="pageRanking.bit">랭킹</a> <a href="#" class="active">자유게시판</a>
				</div>
			</div>
			<div class="header-right">
				<a href="#" class="icon search-icon" aria-label="검색"> <svg
						xmlns="http://www.w3.org/2000/svg" width="40" height="40"
						fill="currentColor" viewBox="0 0 24 24">
                        <path
							d="M10 2a8 8 0 105.292 14.292l5.707 5.707 1.414-1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                    </svg>
				</a> <a href="#" class="icon notification-icon" aria-label="알림"> <svg
						xmlns="http://www.w3.org/2000/svg" width="40" height="40"
						fill="currentColor" viewBox="0 0 24 24">
                        <path
							d="M12 2a7 7 0 00-7 7v5H4v2h16v-2h-1v-5a7 7 0 00-7-7zm-3 16h6a3 3 0 01-6 0z" />
                    </svg>
				</a>
				<div class="profile-container">
					<a href="#" class="profile-icon" id="profileImage" aria-label="프로필">
						<img src="assets/images/profile.jpg" alt="Profile">
					</a>
					<div class="dropdown-menu" id="dropdownMenu">
						<button class="dropdown-item" id=myPage>마이페이지</button>
						<button class="dropdown-item" id="logout">로그아웃</button>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- 게시판 -->
	<!-- 컨텐츠를 중앙 정렬하고 좌우 패딩을 적용할 컨테이너 -->
	<div class="content-wrapper">
		<!-- 게시판 제목 -->
		<h2>자유게시판</h2>
		<p class="description">
			자유게시판은 자유로운 의견을 남기는 공간으로 민원 관련 답변은 드리지 않습니다.<br> 민원 관련 문의 사항은
			국민신문고와 연계된 <a href="#">상관민원포털</a>을 이용해 주시기 바랍니다.
		</p>

		<!-- 검색 및 글쓰기 버튼 -->
		<div class="board-controls">
			<select>
				<option>검색 선택</option>
				<option>제목</option>
				<option>작성자</option>
			</select> <input type="text" id="searchBox" placeholder="검색어를 입력하세요">
			<button id="searchBtn">검색</button>
			<button id="resetBtn">초기화</button>
		</div>

		<!-- 게시물 리스트 테이블 -->
		<div class="table-wrapper">
			<table class="board-list">
				<thead>
					<tr>
						<th>순번</th>
						<th>제목</th>
						<th>등록자명</th>
						<th>등록일</th>
						<th>조회수</th>
					</tr>
				</thead>
				<tbody id="postContainer">
					<tr>
						<td>17079</td>
						<td><a href="post.html">조지호 경찰청장님께 드리는 다소 사적인 질문입니다. <span
								class="new-badge">N</span></a></td>
						<td>김**</td>
						<td>2024-11-08</td>
						<td>2</td>
					</tr>

				</tbody>
			</table>
		</div>
		<!-- 페이지네이션 -->
		<div class="pagination" id="paginationContainer">
			<button id="prevBtn">&lt;</button>
			<!-- 페이지 번호 버튼들이 여기에 동적으로 추가됩니다 -->
			<button id="nextBtn">&gt;</button>
		</div>

		
		<!--게시물확인 모달 -->
		<div id="postModal" class="modal" style="display: none;">
			<div class="modal-content">
				<span class="close-btn">&times;</span>
				<h2 id="modalTitle">게시글 제목</h2>
				<p>
					<strong>작성자:</strong> <span id="modalAuthor"></span>
				</p>
				<p>
					<strong>등록일:</strong> <span id="modalDate"></span>
				</p>
				<p>
					<strong>조회수:</strong> <span id="modalViews"></span>
				</p>
				<p id="modalContent">여기에 게시글 내용이 표시됩니다.</p>
			</div>
		</div>
		<!-- 글쓰기 모달 -->
		<div id="writeModal" class="modal" style="display: none;">
			<div class="modal-content">
				<span class="close-btn">&times;</span>
				<h2>새 글 작성</h2>
				<form id="writeForm">
					<label for="postTitle">제목</label> <input type="text" id="postTitle"
						name="postTitle" required placeholder="제목을 입력하세요"> <label
						for="postContent">내용</label>
					<textarea id="postContent" name="postContent" rows="10" required
						placeholder="내용을 입력하세요"></textarea>

					<button type="submit" class="submit-btn">작성하기</button>
				</form>
			</div>
		</div>

		<!-- 글쓰기 버튼 -->
		<div class="write-button">
			<button id="writeBtn">글쓰기</button>
		</div>

	</div>

	<!-- footer ! -->
	<div class="footer">
		TEAM BitCoding | 스마트인재개발원 | DCX기반 빅데이터 분석서비스 개발자과정 | <br> 목포시
		산정로212번길 13 | 010 9547 1598<br> Copyright 2024. BitCoding All
		rights reserved.
	</div>

</body>