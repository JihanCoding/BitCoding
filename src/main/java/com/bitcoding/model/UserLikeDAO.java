package com.bitcoding.model;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.bitcoding.database.ServerManager;

public class UserLikeDAO {

	private SqlSessionFactory server = ServerManager.getSqlSessionFactory();

	// 1. po_like 랭킹
	public List<UserLike> po_like_select() {
		SqlSession session = server.openSession(true);

		List<UserLike> result = session.selectList("po_like_select");

		session.close();
		
		return result;
	}
	
	// 2. co_like 랭킹
	public List<UserLike> co_like_select() {
		SqlSession session = server.openSession(true);

		List<UserLike> result = session.selectList("co_like_select");

		session.close();
		
		return result;
	}
	
	// 그냥 전체 랭킹
	public List<UserLike> user_like_all() {
		SqlSession session = server.openSession(true);

		List<UserLike> result = session.selectList("user_like_all");

		session.close();
		
		return result;
	}
	
	// 3. 생성
	public int user_like_create(UserLike ul) {
		SqlSession session = server.openSession(true);

		int cnt = session.insert("user_like_create", ul);

		session.close();

		return cnt;
	}
	
	public int ul_delete_mem(UserLike ul) {
		SqlSession session = server.openSession(true);

		int cnt = session.delete("ul_delete_mem", ul);

		session.close();

		return cnt;
	}
	
	
	// 4. 상태업데이트
	public int user_like_update(UserLike ul) {
		SqlSession session = server.openSession(true);

		int cnt = session.update("user_like_update", ul);

		session.close();

		return cnt;
	}
	
	// 5. 업데이트를 위한 정보 가져오기
	public UserLike user_like_get(UserLike ul) {
		SqlSession session = server.openSession(true);
		UserLike data = session.selectOne("user_like_get", ul);
		
		session.close();
		
		return data;
	}
}