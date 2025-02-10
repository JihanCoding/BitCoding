package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Post;
import com.bitcoding.model.PostDAO;
import com.google.gson.Gson;

public class GetPostController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 // JSON 형식으로 응답 설정
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
		PostDAO dao = new PostDAO();
		List<Post> list = dao.searchall();
		
        // Gson 객체를 사용해 JSON 변환
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(list);

        // JSON 응답 전송
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
        
		return null;
	}

}
