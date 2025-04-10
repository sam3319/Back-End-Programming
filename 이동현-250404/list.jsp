<%@page import="javax.sql.*"%>
<%@page import="javax.naming.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.sql.*"%>

<%
	// 1. JNDI를 사용하여 DataSource 얻기 및 Connection 생성
	Context initCtx = new InitialContext();
	DataSource ds = (DataSource)initCtx.lookup("java:comp/env/jdbc/dhlee");
	Connection con = ds.getConnection(); 

	// 2. SQL 쿼리 준비: stumember 테이블의 모든 정보 조회
	PreparedStatement stmt = con.prepareStatement("select * from stumember");

	// 3. SQL 쿼리 실행: 결과 ResultSet에 저장
	ResultSet rs = stmt.executeQuery();

	// 4. ResultSet 처리 및 테이블 출력 준비
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>사용자 목록</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container"><br>	
	<h1 class="text-center font-weight-bold">사용자 정보</h1>
	<br>
	<table class="table table-hover">
	
		<tr>
			<th>아이디</th>
			<th>이름</th>
			<th>비밀번호</th>
		</tr>
<% 
	// 5. ResultSet 순회 및 테이블 데이터 출력
	String id, name, pwd;
	while(rs.next()){
		id = rs.getString("id");
		name = rs.getString("name");
		pwd = rs.getString("pwd");
%>	
		<tr>
	<!-- 6. 아이디 클릭 시 updateForm.jsp로 이동 -->
			<td><a href="updateForm.jsp?id=<%=id %>"><%=id %></a></td>
			<td><%=name %></td>
			<td><%=pwd %></td>
		</tr>
<%
	}

	// 7. Connection, Statement, ResultSet 리소스 해제
	con.close();
	stmt.close();
	rs.close();
%>
	</table>
	</div>	
</body>
</html>
