package com.bitcoding.model;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.bitcoding.database.ServerManager;

public class CommentDAO {

	private SqlSessionFactory server = ServerManager.getSqlSessionFactory();

	// 1. 게시물 생성
	public int create(Comment cmt) {
		SqlSession session = server.openSession(true);

		int cnt = session.insert("cmt_create", cmt);

		session.close();

		return cnt;
	}
	
	// 2. 전체 정보 조회
	public List<Comment> searchall() {
		SqlSession session = server.openSession(true);

		List<Comment> result = session.selectList("cmt_searchall");

		session.close();

		return result;
	}
	
	// 3. 댓글 삭제
	public int delete(Comment cmt) {
		SqlSession session = server.openSession(true);

		int cnt = session.delete("cmt_delete", cmt);

		session.close();

		return cnt;
	}
	
	// 4. 좋아요버튼 채팅버튼 업데이트
	public int cmt_update_reaction(Comment cmt){
		SqlSession session = server.openSession(true);

		int cnt = session.delete("cmt_update_reaction", cmt);

		session.close();

		return cnt;
	}
	
	public int cmt_delete_mem(Comment cmt) {
		SqlSession session = server.openSession(true);

		int cnt = session.delete("cmt_delete_mem", cmt);

		session.close();

		return cnt;
	}
}