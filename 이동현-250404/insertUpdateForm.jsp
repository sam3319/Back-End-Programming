<%@page import="javax.sql.*"%>
<%@page import="javax.naming.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
import = "java.sql.*"
pageEncoding="UTF-8"%>
<%
	// 1. Request Parameter 가져오기
	String id = request.getParameter("id");
	String name = request.getParameter("name");
	String pwd = request.getParameter("pwd");
	String action = "insertPro.jsp"; // 기본 action은 insert

	// 2. ID가 존재하는 경우 DB에서 사용자 정보 조회
	if(id !=null){
		// 3. JNDI를 사용하여 DataSource 얻기 및 Connection 생성
		Context initCtx = new InitialContext();
		DataSource ds = (DataSource)initCtx.lookup("java:comp/env/jdbc/dhlee");
		Connection con = ds.getConnection(); 

		// 4. SQL 쿼리 준비 및 실행: ID로 사용자 정보 조회
		String sql = "select * from stumember where id = ?";
		PreparedStatement pstmt = con.prepareStatement(sql);
		pstmt.setString(1, id);

		ResultSet rs = pstmt.executeQuery();
		// 5. 결과 처리: 사용자 정보가 존재하면 updateForm으로 변경
		if(rs.next()){
			name = rs.getString("name");
			pwd = rs.getString("pwd");
			action = "updatePro.jsp";
		}
	}else{
		id=""; // ID가 null이면 빈 문자열로 초기화
	}
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>사용자 입력</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container">
		<br>
		<h2 class="text-center font-weight-bold">사용자 입력</h2>
		<hr/>

		<!-- 6. Form 구성: 사용자 정보 입력 및 수정 폼 -->
		<form action="<%=action %>" method="post">
		  <div class="form-group">
	      <label for="id">ID:</label>
	      <input type="text" class="form-control" id="id" name="id" value="<%=id%>">
	    </div>
	    <div class="form-group">
	      <label for="name">NAME:</label>
	      <input type="text" class="form-control" id="name" name="name" value="<%=name%>">
	    </div>
	    <div class="form-group">
	      <label for="pwd">PASSWORD:</label>
	      <input type="password" class="form-control" id="pwd" name="pwd" value="<%=pwd%>">
	    </div>
	    <br>
	    <div class="text-center">
     <!-- 7. 버튼 구성: 변경, 삭제, 목록 버튼 -->
	    		<input type="submit" value="변경" class="btn btn-secondary">  
					<input type="button" value="삭제" class="btn btn-secondary" onclick="location.href='delete.jsp?id=<%=id%>'">
					<input type="button" value="목록" class="btn btn-secondary" onclick="location.href='list.jsp'">
			</div>
		</form>
	</div>
</body>
</html>
