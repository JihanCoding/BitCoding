package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bitcoding.model.Comment;
import com.bitcoding.model.CommentDAO;
import com.bitcoding.model.Member;

public class CreateCommentController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");

		// 'post_id' : postId, 'cmt_content' : newCommentText, 'email' :
		// user_info.email, 'nick' : user_info.nick

		HttpSession session = request.getSession();

		Member member = (Member) session.getAttribute("member");
		
		int post_idx = Integer.parseInt(request.getParameter("post_id"));
		String cmt_content = request.getParameter("cmt_content");
		String email = member.getEmail();
		String nick = member.getNick();
		String profile = member.getProfile();

		Comment cmt = new Comment(0, post_idx, cmt_content, null, email, nick, profile, "false","false");
		CommentDAO dao = new CommentDAO();

		PrintWriter out = response.getWriter();

		int result = dao.create(cmt);

		if (result > 0) {
			out.print("true");
		} else {
			out.print("false");
		}
		return null;
	}

}
