<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TOF</title>
    <link rel="stylesheet" href="assets/css/join.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="assets/js/join.js"></script>
</head>
<body>
    <div class="modal-backdrop"></div>
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
                    <h2>프리미엄 고민 상담소</h2>
                    <p class="description">지금 TF에 가입하세요</p>

                    <button class="kakao-button">
                        <svg class="kakao-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#3C1E1E" d="M12 2C6.48 2 2 5.95 2 10.62c0 2.22 1.1 4.21 2.88 5.62l-.7 4.41c-.1.61.5 1.1 1.05.82l4.95-2.47c.61.09 1.24.14 1.82.14 5.52 0 10-3.95 10-8.62C22 5.95 17.52 2 12 2Z" />
                        </svg>
                        카카오로 3초만에 가입하기
                    </button>

                    <div class="divider">또는</div>
                    <button id="email-signup-button" class="email-button">이메일로 가입하기</button>
                    <div class="login-prompt">
                        <span>이미 회원이신가요?</span>
                        <a href="login.bit" class="login-link">로그인하기<span class="arrow">〉</span></a>
                    </div>

                    <div id="email-form" class="email-form">
                        <form id="join-form">
                            <label for="email">이메일</label>
                            <input type="email" id="email_check" name="join_email" placeholder="example@gmail.com" required>
                            <span id="result"></span>
                            <label for="name">이름</label>
                            <input type="text" name="join_name" placeholder="홍길동" required>
                            <label for="password">비밀번호</label>
                            <input type="password" name="join_password" required>
                            <label for="nick">닉네임</label>
                            <input type="text" name="join_nick" id = "nick_check" placeholder="닉네임" required>
                            <span id="checkNick"></span>
                            <label for="gender">성별</label>
                            <select name="join_gender" required>
                                <option value="">성별 선택</option>
                                <option value="M">남자</option>
                                <option value="F">여자</option>
                            </select>
                            <label for="birth">생년월일</label>
                            <input type="text" id="birth" name="join_birth" placeholder="연도-월-일">
                            <label for="phoneNumber">전화번호</label>
                            <input type="tel" name="join_phoneNumber" placeholder="000-0000-0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required>
                            <label for="profilePicture">프로필 사진</label>
    						<input type="file" id="profilePicture" name="profilePicture" accept="image/*">
    						<!-- 이미지 미리보기 -->
    						<div id="preview">
        					<img id="previewImage" src="#" alt="Image Preview" style="display: none; width: 150px; height: 150px;">
    						</div>
                            <button type="submit" id="join">제출하기</button>
                        </form>
                    </div>

                    <div class="footer">
                        TEAM BitCoding | 스마트인재개발원 | DCX기반 빅데이터 분석서비스 개발자과정 | <br>
                        목포시 산정로212번길 13 | 010 9547 1598<br>
                        Copyright 2024. BitCoding All rights reserved.
                    </div>
                </div>
            </div>
        </main>

        <div class="modal" id="join-modal2">
            <div class="modal-header">
                <h2>T/F 성향 테스트</h2>
                <span class="modal-close close-modal-button">×</span>
            </div>
            <form id="join-form2">
                <div class="table-container">
                    <table class="survey-table">
                        <thead>
                            <tr>
                                <th class="question-header">질문</th>
                                <th class="options">매우 그렇지 않다</th>
                                <th class="options">그렇지 않다</th>
                                <th class="options">보통이다</th>
                                <th class="options">그렇다</th>
                                <th class="options">매우 그렇다</th>
                            </tr>
                        </thead>
                        <tbody id="questionContainer">
                            <!-- jQuery로 동적 생성될 질문 행이 여기에 추가됩니다 -->
                        </tbody>
                    </table>
                </div>
                <button type="submit" id="join2">제출하기</button>
            </form>
        </div>
    </div>
</body>
</html>
