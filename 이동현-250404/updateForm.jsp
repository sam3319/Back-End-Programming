<%@page import="javax.sql.*"%>
<%@page import="javax.naming.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.sql.*" %>
<% 	
	// 1. Request 객체 인코딩 설정
	request.setCharacterEncoding("utf-8");
	String id = request.getParameter("id");
	String name = "";
	String pwd = "";

	// 2. JNDI를 사용하여 DataSource 얻기 및 Connection 생성
	Context initCtx = new InitialContext();
	DataSource ds = (DataSource)initCtx.lookup("java:comp/env/jdbc/dhlee");
	Connection con = ds.getConnection(); 

	// 3. SQL 쿼리 준비: ID에 해당하는 name, pwd 조회
	String sql = "select name, pwd from stumember where id = ?";
	PreparedStatement stmt = con.prepareStatement(sql);

	// 4. PreparedStatement에 파라미터 설정
 	stmt.setString(1, id);

	// 5. 쿼리 실행 및 결과 처리
	ResultSet rs = stmt.executeQuery();
	if(rs.next()){
		name = rs.getString("name");
		pwd = rs.getString("pwd");
	}

	// 6. 리소스 해제
	con.close();
	stmt.close();
	rs.close();
%>	
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>사용자 정보 변경</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<body>

	<div class="container">
		<br>
		<h2 class="text-center font-weight-bold">사용자 정보 변경</h2>
		<hr/>
	<!-- 7. Form 구성: 사용자 정보 수정 폼 -->
		<form action="updatePro.jsp" method="post">
		  <div class="form-group">
	      <label for="id">ID:</label>
	      <input type="text" class="form-control" id="id" name="id" value="<%=id%>" readonly>
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
        <!-- 8. 버튼 구성: 변경, 삭제, 목록 버튼 -->
	    		<input type="submit" value="변경" class="btn btn-secondary">  
					<input type="button" value="삭제" class="btn btn-secondary" onclick="location.href='delete.jsp?id=<%=id%>'">
					<input type="button" value="목록" class="btn btn-secondary" onclick="location.href='list.jsp'">
			</div>
		</form>
	</div>
</body>
</html>
