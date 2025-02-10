<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ff8cb2,100:ff4d6d&height=250&section=header&text=T/F%20테스트%20기반%20익명%20고민상담%20서비스&fontSize=45&fontColor=ffffff&fontAlign=50&fontAlignY=40&width=1400" />
</div>

---

## 📖 **프로젝트 소개**  
T/F 테스트 기반으로 사용자가 고민을 게시하고, 익명성을 보장한 상태에서 다른 사용자들의 반응을 받을 수 있는 맞춤형 고민 상담 서비스입니다.  
코로나19 이후 정신 건강 이슈가 증가하는 상황에서 심리적 안정과 사회적 지지를 제공하는 것을 목표로 한 프로젝트입니다.

---

## 🎯 **주요 기능**

### ✨ **피드 페이지 (Feed Page)**  
- 익명 고민 게시물 **로드/실시간 업데이트** 기능 구현  
- 고민 게시물 **검색 기능** 구현 (키워드 검색, 필터링)  
- 고민 게시물 **작성/수정/삭제** 기능 구현  
- 좋아요 기능을 **T/F 반응 형태**로 구현 (사실/거짓)  
- AI 챗봇 연동을 통한 간단한 **고민 상담 기능** 제공  
- AJAX 기반 비동기 페이지 업데이트로 사용자 경험(UX) 개선  

---

### 🏆 **랭킹 페이지 (Ranking Page)**  
- 고민 게시물, 댓글, T/F 반응 수를 기반으로 **랭킹 정보** 제공  
- T/F 반응(사실/거짓)에 따라 **게시물 및 사용자 순위 필터링** 기능 구현  
- 사용자의 **참여도**에 따른 가시적인 성취감 제공  

---

### 📋 **마이 페이지 (My Page)**  
- **개인 게시물 관리** 기능 (등록 게시물 로드, 수정, 삭제)  
- **회원정보 수정** 기능 (닉네임, 프로필 이미지 등)  
- 개인 스코어(참여도, 반응도) **조회 기능** 구현  
- 개인 스코어를 백분율 그래프로 시각화하여 성취도 제공  

---

### 🤖 **실시간 챗봇 (Live Chat Bot)**  
- **OpenAI GPT4.0** 모델 파인튜닝을 통해 상담사 구현  

---

## 🛠️ **기술 스택**

<div align="center">
  
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JSP](https://img.shields.io/badge/JSP-007396?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Oracle DB](https://img.shields.io/badge/Oracle_DB-F80000?style=for-the-badge&logo=oracle&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

---

## 🗓️ **프로젝트 일정**  
📅 **4주간의 프로젝트 로드맵!**

| 주차  | 주요 작업 내용                        |
|-------|----------------------------------------|
| 1주차 | 프로젝트 기획 및 요구사항 분석          |
| 2주차 | 데이터베이스 설계 및 백엔드 API 개발    |
| 3주차 | 프론트엔드 개발 및 UI 디자인           |
| 4주차 | 테스트 및 디버깅                       |

---

## 🛠️ **트러블슈팅**

### 🛑 **문제:** OpenAI API 연결 시 요청 횟수 제한을 초과한 오류 발생  
**상황:** 요청 후 재요청까지의 대기 시간이 없어서 API 요청 횟수 초과로 오류 발생  
**해결:** 요청 후 **2초간의 대기 시간** 설정을 통해 요청 횟수 제한을 해결  

---

### 🛑 **문제:** 비동기로 전달받은 데이터가 Undefined로 나타남  
**상황:** 비동기 특성상 데이터를 전부 받기 전에 코드가 실행되어 undefined 발생  
**해결:** **콜백 함수**를 사용하여 데이터를 다 받은 후에 다음 작업을 진행하도록 구현  

---

### 🛑 **문제:** 요청한 쿼리문이 아닌 다른 Mapper의 쿼리문이 실행됨  
**상황:** 다른 Mapper지만 ID값이 같아 호출 시 충돌 및 오류 발생  
**해결:** 쿼리 **ID 앞에 구분자를 추가**하여 해결 (예: `id="Co_SelectALL"`)  

---

## 📸 **시연 화면**

<div align="center">
<img src="https://github.com/JihanCoding/BitCoding/blob/main/bitcoding.gif?raw=true" alt="시연 화면" width="500" />
</div>

---

## 📚 **참고 자료**

- [전남혁, 『코로나 우울, 익명으로 상담... 비대면 심리치유 플랫폼 이용 급증』, 동아일보, 2021년 12월 29일](https://www.donga.com/news/Economy/article/all/20211229/110992982/1)
- [보건복지부, 『2024년 국민 정신건강 지식 및 태도 조사 발표』, 보건복지부 웹사이트](https://www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&act=view&list_no=1482175&tag=&nPage=1)


---

> "고민 상담을 통해 사용자에게 심리적 안정과 사회적 지지를 제공합니다. 함께 성장하는 공간을 만들어갑시다!" 🌟
