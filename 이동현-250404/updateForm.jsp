<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.sql.*" %>
<% 	
	request.setCharacterEncoding("utf-8");
	String id = request.getParameter("id");
	String name = "";
	String pwd = "";
//1. DB 연동 드라이버 로드
	Class.forName("org.mariadb.jdbc.Driver");
//2. 연결 객체 생성
	String url = "jdbc:mariadb://localhost:3307/backend";
	String user = "dhlee";
	String pass = "1111";
	Connection con = DriverManager.getConnection(url, user, pass);
//3. 생성된 연결을 통해 SQL문 실행 의뢰 준비
	String sql = "select name, pwd from stumember where id = ?";
	PreparedStatement stmt = con.prepareStatement(sql);
//4. SQL 실행
 	stmt.setString(1, id);
//5. 주어진 id에 해당되는 name과 pwd 추출
	ResultSet rs = stmt.executeQuery();
		if(rs.next()){
		name = rs.getString("name");
		pwd = rs.getString("pwd");
		}
		
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
	    		<input type="submit" value="변경" class="btn btn-secondary">  
					<input type="button" value="삭제" class="btn btn-secondary" onclick="location.href='delete.jsp?id=<%=id%>'">
					<input type="button" value="목록" class="btn btn-secondary" onclick="location.href='list.jsp'">
			</div>
		</form>
	</div>
</body>
</html>