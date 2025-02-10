package com.bitcoding.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor
@Data
public class Post {
//	@RequiredArgsConstructor // NonNull 표시해둔 변수만 초기화하는 생성자
//	@NoArgsConstructor // 기본 생성자
//	@AllArgsConstructor // 모든 필드를 초기화 하는 생성자
//	@Data // 기본 메소드(Getter/Setter)자동완성\\\
	
	private int post_idx;
	private String post_title;
	private String post_content;
	private String post_file;
	private String create_at;
	private String email;
	private String nick;
	private String post_type;
	private String profile;
	private String category;
	private String post_tag;
	private String mem_type;
	private int post_like;
}
