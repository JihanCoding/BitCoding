package com.bitcoding.model;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.bitcoding.database.ServerManager;

public class LikesDAO {

	private SqlSessionFactory server = ServerManager.getSqlSessionFactory();

	// 1. 좋아요 확인
	public String search(Likes like) {
		SqlSession session = server.openSession(true);

		String result = session.selectOne("like_search", like);

		session.close();
		
		return result;
	}
	
	// 2. 좋아요 추가
	public int create(Likes like) {
		SqlSession session = server.openSession(true);

		int cnt = session.insert("like_create", like);

		session.close();

		return cnt;
	}
	
	
	// 3. 좋아요 삭제
	public int delete(Likes like) {
		SqlSession session = server.openSession(true);

		int cnt = session.delete("like_delete", like);

		session.close();

		return cnt;
	}
	// 4. 회원가입 전체 삭제
	public int like_delete_mem(Likes like) {
		SqlSession session = server.openSession(true);

		int cnt = session.delete("like_delete_mem", like);

		session.close();

		return cnt;
	}
}