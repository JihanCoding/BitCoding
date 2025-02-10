package com.bitcoding.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor
@Data
public class Comment {
//	@RequiredArgsConstructor // NonNull 표시해둔 변수만 초기화하는 생성자
//	@NoArgsConstructor // 기본 생성자
//	@AllArgsConstructor // 모든 필드를 초기화 하는 생성자
//	@Data // 기본 메소드(Getter/Setter)자동완성\\\
	
	private int cmt_idx;
	private int post_idx;
	private String cmt_content;
	private String create_at;
	private String email;
	private String nick;
	private String profile;
	private String co_like;
	private String co_chat;
}
