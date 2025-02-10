package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bitcoding.model.Member;
import com.google.gson.Gson;

public class GetDataController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("들어옴");
		 // JSON 형식으로 응답 설정
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
		HttpSession session = request.getSession();
		Member member = (Member) session.getAttribute("member");
		System.out.println(member);
        // Gson 객체를 사용해 JSON 변환
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(member);

        // JSON 응답 전송
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
        
		return null;
	}

}
