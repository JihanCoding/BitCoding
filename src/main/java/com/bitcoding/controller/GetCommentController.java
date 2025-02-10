package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Comment;
import com.bitcoding.model.CommentDAO;
import com.google.gson.Gson;

public class GetCommentController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// JSON 형식으로 응답 설정
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		CommentDAO dao = new CommentDAO();
		List<Comment> list = dao.searchall();
		String jsonResponse = "";
		// Gson 객체를 사용해 JSON 변환
				Gson gson = new Gson();
		if(list == null) {
			jsonResponse = gson.toJson("{}");
		}else {
			jsonResponse = gson.toJson(list);
		}
		
		System.out.println("여기서 오류가남");
		// JSON 응답 전송
		PrintWriter out = response.getWriter();
		out.print(jsonResponse);
		out.flush();

		return null;
	}

}
