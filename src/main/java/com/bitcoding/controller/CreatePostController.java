package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bitcoding.model.Member;
import com.bitcoding.model.Post;
import com.bitcoding.model.PostDAO;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

public class CreatePostController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// post_idx, post_title, post_content, post_file, create_at, email, nick, post_type, profile, category, post_tag
		request.setCharacterEncoding("UTF-8");
		// 1. request 객체
		// 2. 파일을 저장할 경로(상대경로)
		String savePath = request.getServletContext().getRealPath("./assets/images/profiles");
		// 3. 파일의 허용 용량
		int maxSize = 10 * 1024 * 1024;
		// 4. 파일의 이름 인코딩 방식
		String encoding = "UTF-8";
		// 5. 파일의 이름을 중복제거
		DefaultFileRenamePolicy rename = new DefaultFileRenamePolicy();

		HttpSession session = request.getSession();
		
		Member member = (Member) session.getAttribute("member");
		MultipartRequest multi = new MultipartRequest(request, savePath, maxSize, encoding, rename);
		// 4. FormData로 전달된 데이터 받기
		String post_title = multi.getParameter("title");
		String post_content = multi.getParameter("content");
		String post_file = multi.getFilesystemName("image");
		String email = multi.getParameter("email");
		String nick = multi.getParameter("author");
		String post_type = multi.getParameter("tf");
		String profile = member.getProfile();
		String category = multi.getParameter("category");
		String post_tag = multi.getParameter("tags");
		String mem_type = member.getMem_type();
		
		
		Post data = new Post(0, post_title, post_content, post_file, null, email, nick, post_type, profile, category, post_tag, mem_type, 0);
		data.setPost_file(data.getPost_file() != null ? data.getPost_file() : "");
		
		PostDAO dao = new PostDAO();
		
		PrintWriter out = response.getWriter();

		int result = dao.create(data);

		if (result > 0) {
			out.print("true");
		} else {
			out.print("false");
		}
		return null;
	}
}
