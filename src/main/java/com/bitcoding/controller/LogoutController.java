package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LogoutController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=utf-8");

		HttpSession session = request.getSession();
		session.invalidate();

		response.setContentType("text/html; charset=utf-8");

		PrintWriter out = response.getWriter();
		out.print("true");
		return null;
	}
}
