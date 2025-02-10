package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Likes;
import com.bitcoding.model.LikesDAO;

public class checkLikeController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		int post_id = Integer.parseInt(request.getParameter("post_id"));
		String user_id = request.getParameter("user_id");

		Likes like = new Likes(post_id, user_id);

		LikesDAO dao = new LikesDAO();

		String result = dao.search(like);

		PrintWriter out = response.getWriter();
		
		if(result != null) {
			if (result.equals(user_id)) {
				out.print("true");
				System.out.println("중복아이디 감지"+post_id+user_id);
			}
		}
		else {
			System.out.println(user_id+"중복아이디 미감지");
			out.print("false");
		}
		
		return null;
	}

}
