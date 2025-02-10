package com.bitcoding.controller;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("*.bit")
public class MainController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private HashMap<String, iController> pageHandler;
	@Override
	public void init() throws ServletException {
		
		pageHandler = new HashMap<String, iController>();
		pageHandler.put("/home.bit", new PageHomeController());
		pageHandler.put("/join.bit", new PageJoinController());
		pageHandler.put("/checkEmail.bit", new CheckEmailController());
		pageHandler.put("/joindb.bit", new JoinDBController());
		pageHandler.put("/login.bit", new PageLoginController());
		pageHandler.put("/logindb.bit", new LoginDBController());
		pageHandler.put("/logout.bit", new LogoutController());
		pageHandler.put("/getData.bit", new GetDataController());
		pageHandler.put("/main.bit", new PageMainController());
		pageHandler.put("/pagemy.bit", new PageMyController());
		pageHandler.put("/pageprofile.bit", new PageProfileController());
		pageHandler.put("/pageRanking.bit", new PageRankingController());
		pageHandler.put("/getPost.bit", new GetPostController());
		pageHandler.put("/getComment.bit", new GetCommentController());
		pageHandler.put("/createPost.bit", new CreatePostController());
		pageHandler.put("/createComment.bit", new CreateCommentController());
		pageHandler.put("/deletePost.bit", new DeletePostController());
		pageHandler.put("/updatePost.bit", new UpdatePostController());
		pageHandler.put("/checkLike.bit", new checkLikeController());
		pageHandler.put("/deleteLike.bit", new DeleteLikeController());
		pageHandler.put("/createLike.bit", new CreateLikeController());
		pageHandler.put("/createUL.bit", new CreateULController());
		pageHandler.put("/getLikeData.bit", new GetLikeDataController());
		pageHandler.put("/updateUserLike.bit", new UpdateLikeDataController());
		pageHandler.put("/updateCmt.bit", new UpdateCmtController());
		pageHandler.put("/getPostRank.bit", new GetPostRankController());
		pageHandler.put("/getLikeALL.bit", new GetLikeALLController());
		pageHandler.put("/checkNick.bit", new CheckNickController());
		pageHandler.put("/updateInfo.bit", new UpdateUserInfo());
		pageHandler.put("/deleteMem.bit", new DeleteALLController());
	}

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String uri = request.getRequestURI();
		
		String cpath = request.getContextPath();
		
		String mapping = uri.substring(cpath.length());

		String nextPage = null;

		iController con = pageHandler.get(mapping);
		if(con != null) {
			nextPage = con.execute(request, response);
		}
		System.out.println(nextPage);
		if(nextPage != null) {
			if(!nextPage.contains("redirect:/")) {
				System.out.println("포워드이동");
				RequestDispatcher rd = request.getRequestDispatcher("WEB-INF/views/"+nextPage+".jsp");
				rd.forward(request, response);
			}
			else {
				response.sendRedirect(nextPage.replace("redirect:/", ""));
			}
			
		}
		
	}
}
