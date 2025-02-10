package com.bitcoding.model;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.bitcoding.database.ServerManager;

public class MemberDAO {

	private SqlSessionFactory server = ServerManager.getSqlSessionFactory();

	// 1. 회원가입
	public int join(Member member) {
		SqlSession session = server.openSession(true);

		int cnt = session.insert("join", member);

		session.close();

		return cnt;
	}

	// 2. 회원탈퇴
	public int delete(Member member) {
		SqlSession session = server.openSession(true);

		int cnt = session.delete("delete", member);

		session.close();

		return cnt;
	}

	// 3. 로그인
	public Member login(Member member) {
		SqlSession session = server.openSession(true);

		Member result = session.selectOne("login", member);

		session.close();

		return result;
	}

	// 4. 회원정보수정
	public int updateInfo(Member member) {
		SqlSession session = server.openSession(true);

		int cnt = session.update("updateInfo", member);

		session.close();

		return cnt;
	}

	// 5. 이메일 중복 체크
	public Member check(String email) {
		SqlSession session = server.openSession(true);

		Member result = session.selectOne("check", email);

		session.close();

		return result;
	}
	
	// 5. 이메일 중복 체크
	public Member checkNick(String nick) {
		SqlSession session = server.openSession(true);

		Member result = session.selectOne("checkNick", nick);

		session.close();

		return result;
	}

	// 6. 전체 정보 조회
	public List<Member> search() {
		SqlSession session = server.openSession(true);

		List<Member> result = session.selectList("search");

		session.close();

		return result;
	}
}