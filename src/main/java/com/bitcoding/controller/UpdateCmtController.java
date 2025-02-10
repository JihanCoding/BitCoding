package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Comment;
import com.bitcoding.model.CommentDAO;

public class UpdateCmtController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		int post_idx = Integer.parseInt(request.getParameter("post_idx"));
		int cmt_idx = Integer.parseInt(request.getParameter("cmt_idx"));
		String like = request.getParameter("like");
		String chat = request.getParameter("chat");
		
		System.out.println("왜 안될까?"+post_idx+cmt_idx+like+chat);
		

		Comment cmt = new Comment(cmt_idx, post_idx, null, null, null, null, null, like, chat);
		CommentDAO dao = new CommentDAO();
		int result = dao.cmt_update_reaction(cmt);

		PrintWriter out = response.getWriter();
		System.out.println(result);
		if (result > 0) {
			out.print("true");
		} else {
			out.print("false");
		}
		out.flush();
		return null;
	}

}
