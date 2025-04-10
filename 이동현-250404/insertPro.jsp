<%@page import="javax.sql.*"%> <%-- DataSource 관련 클래스 import --%>
<%@page import="javax.naming.*"%> <%-- JNDI 관련 클래스 import --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import ="java.sql.*" %> <%-- JDBC 관련 클래스 import --%>
<%
	request.setCharacterEncoding("utf-8"); // Request 객체의 문자 인코딩 설정 (한글 깨짐 방지)

	String id = request.getParameter("id");
	String name = request.getParameter("name");
	String pwd = request.getParameter("pwd");

	// 1. JNDI를 사용하여 DataSource 얻기 및 Connection 생성
	Context initCtx = new InitialContext(); 
	DataSource ds = (DataSource)initCtx.lookup("java:comp/env/jdbc/dhlee");
	Connection con = ds.getConnection();

	// 2. SQL 쿼리 준비
	String sql = "insert into stumember values (?, ? , ?)"; 

	// 3. PreparedStatement 생성 및 파라미터 설정
	PreparedStatement pstmt = con.prepareStatement(sql);
	pstmt.setString(1, id);
	pstmt.setString(2, name); 
	pstmt.setString(3, pwd); 

	// 4. 쿼리 실행 및 결과 확인
	int state = pstmt.executeUpdate(); 

	if(state == 1){ 
		out.println("성공적으로 회원 등록이 되었습니다."); 
	}

	// 5. 리소스 해제
	con.close(); 
	pstmt.close(); 

	// 6. list.jsp로 이동 (Redirect)
	response.sendRedirect("list.jsp");
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
</head>
<body>
	행이 입력되었습니다! <%-- 이 메시지는 response.sendRedirect() 때문에 표시되지 않음 --%>
</body>
</html>
