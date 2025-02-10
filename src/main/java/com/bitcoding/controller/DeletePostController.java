package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Comment;
import com.bitcoding.model.CommentDAO;
import com.bitcoding.model.Likes;
import com.bitcoding.model.LikesDAO;
import com.bitcoding.model.Post;
import com.bitcoding.model.PostDAO;

public class DeletePostController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println(request.getParameter("id")+ ":스트링형태");
		int post_id = Integer.parseInt(request.getParameter("id"));
		System.out.println(post_id+"값 전달받음");
		
		
		  Post post = new Post(post_id, null, null, null, null, null, null, null, null, null, null, null, 0);
		  Comment cmt = new Comment(0, post_id, null, null, null, null, null, null, null);
		  System.out.println("코멘트까지 실행됌");
		  Likes like = new Likes(post_id, null);
		  System.out.println("라이크까지 실행됌");
		  PostDAO dao = new PostDAO();
		  System.out.println("포스트다오");
		  CommentDAO dao2 = new CommentDAO();
		  System.out.println("코멘트다오");
		  LikesDAO dao3 = new LikesDAO();
		  System.out.println("라이크다오");
		  
		  
		  
		  PrintWriter out = response.getWriter();
		  dao2.delete(cmt);
		  System.out.println("코멘트삭제");
		  dao3.delete(like);
		  System.out.println("라이크삭제");
		  int result = dao.delete(post);
		  
		  if(result > 0 ) { out.print("true"); } else { out.print("false"); }
		 
		
		return null;
	}

}
