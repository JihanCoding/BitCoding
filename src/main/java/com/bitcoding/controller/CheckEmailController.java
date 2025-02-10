package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Member;
import com.bitcoding.model.MemberDAO;

public class CheckEmailController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// 1. 데이터 수집
		request.setCharacterEncoding("UTF-8");
		String email = request.getParameter("email");
		// 2. 기능 실행
		MemberDAO dao = new MemberDAO();

		Member member = dao.check(email);
		// 3. 데이터 응답

		// 1) 응답형식 지정
		response.setContentType("text/html; charset=utf-8");

		// 2) PrintWriter 객체 생성
		PrintWriter out = response.getWriter();

		// 3) 응답내용을 작성
		
		if( member == null ) {
			out.print("true");
		}else {
			out.print("false");
		}
		return null;
	}

}
