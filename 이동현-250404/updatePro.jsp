<%@page import="javax.sql.*"%>
<%@page import="javax.naming.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import ="java.sql.*" %>
<%	
	// 1. Request 객체 인코딩 설정
	request.setCharacterEncoding("utf-8");

	// 2. 파라미터 값 가져오기
	String name = request.getParameter("name");
	String id = request.getParameter("id");
	String pwd = request.getParameter("pwd");

	// 3. JNDI를 사용하여 DataSource 얻기 및 Connection 생성
	Context initCtx = new InitialContext();
	DataSource ds = (DataSource)initCtx.lookup("java:comp/env/jdbc/dhlee");
	Connection con = ds.getConnection(); 

	// 4. SQL 쿼리 준비: stumember 테이블 업데이트
	String sql = "UPDATE stumember SET NAME=?, PWD=? WHERE ID=?";
	PreparedStatement stmt = con.prepareStatement(sql);

	// 5. PreparedStatement 파라미터 설정
	stmt.setString(1, name);
	stmt.setString(2, pwd);
	stmt.setString(3, id);

	// 6. 쿼리 실행 및 결과 확인
	int i = stmt.executeUpdate();
	if(i == 1){
		out.println("업데이트 되었습니다.");
	}

	// 7. 리소스 해제
	con.close();
	stmt.close();
	
%>
        <!--8. JavaScript를 사용하여 알림창 표시 후 list.jsp로 이동 -->
	<script>
		let ans = alert("변경되었습니다!");
		if (!ans) { location.href='list.jsp'; }
	</script>
