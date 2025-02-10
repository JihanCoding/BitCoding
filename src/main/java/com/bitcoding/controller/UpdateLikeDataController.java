package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.UserLike;
import com.bitcoding.model.UserLikeDAO;

public class UpdateLikeDataController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String user_id = request.getParameter("user_id");
		System.out.println(request.getParameter("po_like")+ request.getParameter("co_like"));
		int po_like = Integer.parseInt(request.getParameter("po_like"));
		int co_like = Integer.parseInt(request.getParameter("co_like"));

		UserLike ul = new UserLike(user_id, po_like, co_like);
		UserLikeDAO dao = new UserLikeDAO();
		int result = dao.user_like_update(ul);

		PrintWriter out = response.getWriter();

		if (result > 0) {
	        out.print("true");
		} else {
			out.print("false");
		}
		out.flush();
		return null;
	}

}
