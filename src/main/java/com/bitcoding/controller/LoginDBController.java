package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bitcoding.model.Member;
import com.bitcoding.model.MemberDAO;

public class LoginDBController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	// 1. 데이터 수집
		
		System.out.println("로그인");
		request.setCharacterEncoding("UTF-8");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		System.out.println("이메일"+email);
		System.out.println("비밀번호"+password);
		
		if (email == null) email = "";
	    if (password == null) password = "";
		
		Member data = new Member();
		data.setEmail(email);
		data.setPw(password);

		MemberDAO dao = new MemberDAO();

		Member result = dao.login(data);

		 HttpSession session = request.getSession();
		 
		 PrintWriter out = response.getWriter();
		if(result != null ) {
			System.out.println("로그인 성공");
			session.setAttribute("member", result);
			out.print("true");
		}else {
			System.out.println("로그인 실패");
			out.print("false");
		}
		return null;
	}
}
