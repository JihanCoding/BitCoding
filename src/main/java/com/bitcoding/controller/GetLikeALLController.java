package com.bitcoding.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bitcoding.model.Member;
import com.bitcoding.model.MemberDAO;
import com.bitcoding.model.UserLike;
import com.bitcoding.model.UserLikeDAO;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class GetLikeALLController implements iController {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");
		request.setCharacterEncoding("UTF-8");

		UserLikeDAO dao = new UserLikeDAO();
		MemberDAO m_dao = new MemberDAO();
		List<UserLike> like = dao.user_like_all();
		List<Member> members = m_dao.search();
		Map<String, String> memberTypeMap = new HashMap<>();

		for (int i = 0; i < like.size(); i++) {
			for (int j = 0; j < members.size(); j++) {
				if (like.get(i).getUser_id().equals(members.get(j).getNick())) {
					memberTypeMap.put(members.get(j).getNick(), members.get(j).getMem_type());
				}
			}
		}

		PrintWriter out = response.getWriter();

		if (like != null) {
			System.out.println("널아님;");
			Gson gson = new Gson();
			// like 리스트를 JSON 배열로 변환
			JsonArray jsonArray = new JsonArray();
			for (UserLike userLike : like) {
				// 각 UserLike 객체를 JsonObject로 변환
				JsonObject jsonObject = gson.toJsonTree(userLike).getAsJsonObject();

				// mem_type 필드를 추가
				String memType = memberTypeMap.get(userLike.getUser_id());
				if (memType != null) {
					jsonObject.addProperty("mem_type", memType);
				}

				// JSON 배열에 추가
				jsonArray.add(jsonObject);
			}

			// JSON 배열을 최종 JSON 문자열로 변환
			// JSON 배열을 최종 JSON 문자열로 변환
			String jsonResult = gson.toJson(jsonArray);
			out.print(jsonResult);
		}
		out.flush();
		return null;
	}

}
