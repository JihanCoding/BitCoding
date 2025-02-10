package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bitcoding.model.Comment;
import com.bitcoding.model.CommentDAO;
import com.bitcoding.model.Likes;
import com.bitcoding.model.LikesDAO;
import com.bitcoding.model.Member;
import com.bitcoding.model.MemberDAO;
import com.bitcoding.model.Post;
import com.bitcoding.model.PostDAO;
import com.bitcoding.model.UserLike;
import com.bitcoding.model.UserLikeDAO;

public class DeleteALLController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		Member data = (Member)session.getAttribute("member");
		String email = data.getEmail();
		String nick = data.getNick();	
		System.out.println("email은"+email);
		System.out.println("nick은"+nick);
		Post post = new Post(0, null, null, null, null, email, null, null, null, null, null, null, 0);
		Comment cmt = new Comment(0, 0, null, null, email, null, null, null, null);
		Likes like = new Likes(0, email);
		UserLike ul = new UserLike(nick, 0, 0);
		Member member = new Member(email, null, null, null, null, null, null, null, null, null);
		
		PostDAO dao = new PostDAO();
		CommentDAO dao2 = new CommentDAO();
		LikesDAO dao3 = new LikesDAO();
		UserLikeDAO dao4 = new UserLikeDAO();
		MemberDAO dao5 = new MemberDAO();

		PrintWriter out = response.getWriter();
		
		dao2.cmt_delete_mem(cmt);
		dao.po_delete_mem(post);
		dao3.like_delete_mem(like);
		dao4.ul_delete_mem(ul);
		int result = dao5.delete(member);
		System.out.println("result값"+result);

		if (result > 0) {
			out.print("true");
		} else {
			out.print("false");
		}
		return null;
	}

}
