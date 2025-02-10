package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.UserLike;
import com.bitcoding.model.UserLikeDAO;
import com.google.gson.Gson;

public class GetLikeDataController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("서블릿들어옴");
		response.setContentType("application/json");
		request.setCharacterEncoding("UTF-8");

		String user_id = request.getParameter("user_id");

		UserLike ul = new UserLike(user_id, 0, 0);
		UserLikeDAO dao = new UserLikeDAO();
		UserLike data = dao.user_like_get(ul);
		System.out.println(data+"데이터의 값입니다.");
		PrintWriter out = response.getWriter();

		if (data != null) {
			System.out.println("널아님;");
			Gson gson = new Gson();
	        String jsonData = gson.toJson(data); // UserLike 객체를 JSON 문자열로 변환
	        out.print(jsonData);
		} else {
			out.print("{}");
		}
		out.flush();
		return null;
	}

}
