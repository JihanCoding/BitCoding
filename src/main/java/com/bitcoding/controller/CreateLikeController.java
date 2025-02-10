package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Likes;
import com.bitcoding.model.LikesDAO;
import com.bitcoding.model.Post;
import com.bitcoding.model.PostDAO;

public class CreateLikeController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		int post_id = Integer.parseInt(request.getParameter("post_id"));
		String user_id = request.getParameter("user_id");
		int post_like = Integer.parseInt(request.getParameter("post_like"));

		Likes like = new Likes(post_id, user_id);
		Post post = new Post(post_id, null, null, null, null, null, null, null, null, null, null, null, post_like);

		LikesDAO dao = new LikesDAO();
		PostDAO pdao = new PostDAO();

		int result = dao.create(like);
		pdao.updateLike(post);
		
		PrintWriter out = response.getWriter();
		
		if(result > 0) {
			out.print("true");
		}
		else {
			out.print("false");
		}

		return null;
	}

}
