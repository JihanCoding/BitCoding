package com.bitcoding.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.UserLike;
import com.bitcoding.model.UserLikeDAO;

public class CreateULController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String user_id = request.getParameter("user_id");
		System.out.println("회원가입 닉네임전달"+user_id);

		UserLike ul = new UserLike(user_id, 0, 0);
		UserLikeDAO dao = new UserLikeDAO();

		int result = dao.user_like_create(ul);
		
		if(result > 0) {
			System.out.println("UserLike DB 생성완료");
		}
		else {
			System.out.println("UserLike DB 생성실패");
		}
		return null;
	}

}
