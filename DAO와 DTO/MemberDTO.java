package cs.dit.Member;

/**==================================================
 * 프로그램명 : cs.dit.Member
 * 파일명 : MemberDTO.java
 * 작성일 : 2025. 4. 16.
 * 작성자 :  이동현
 * 변경이력 :
 * 프로그램 설명 : 
 *===================================================*/
public class MemberDTO {
	private String id;
	private String name;
	private String pwd;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public MemberDTO(String id, String name, String pwd) {
		this.id = id;
		this.name = name;
		this.pwd = pwd;
	}
	
	
}
