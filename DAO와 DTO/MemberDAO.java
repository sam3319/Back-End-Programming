package cs.dit.Member;

import java.sql.*;
import java.lang.reflect.Member;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

/**==================================================
 * 프로그램명 : Member
 * 파일명 : MemberDAO.java
 * 작성일 : 2025. 4. 16.
 * 작성자 :  
 * 변경이력 :
 * 프로그램 설명 : 데이터베이스와 연동하고 CRUD가 가능한 메소드 구현
 *===================================================*/
public class MemberDAO {
	//DB연동 커넥션 생성
	public Connection getConnection() throws Exception {
		
		//connection pool을 활용한 db연동
		Context initCtx = new InitialContext();
		Context envCtx = (Context)initCtx.lookup("java:comp/env");
		DataSource ds = (DataSource)envCtx.lookup("jdbc/");
		Connection con = ds.getConnection();
		return con;
	}
	//데이터베이스에 데이터 저장
	public void insert(MemberDTO dto) {
		String sql = "insert into member(id, name, pwd) values(?, ?, ?)";
		
		try (Connection con = getConnection();
			PreparedStatement pstmt = con.prepareStatement(sql);
			){
			
			pstmt.setString(1, dto.getId());
			pstmt.setString(2, dto.getName());
			pstmt.setString(3, dto.getPwd());
			
			pstmt.executeUpdate();
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//DB에서 레코드 조회
	public ArrayList<MemberDTO> list(){
		String sql = "select id, name, pwd from member";
		ArrayList <MemberDTO> dtos = new ArrayList();
		try(Connection con = getConnection();
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(sql);
			){
			while(rs.next()) {
				String id = rs.getString("id");
				String name = rs.getString("name");
				String pwd = rs.getString("pwd");
				MemberDTO dto = new MemberDTO(id, name, pwd);
				
				dtos.add(dto);
			}
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return dtos;
	}
}
