<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>학생 정보 페이지</title>
</head>
<body>
<%
	// 1. 파라미터 값 가져오기
	String name = request.getParameter("name");
	String password = request.getParameter("password"); 
	String email = request.getParameter("email"); 
	String phone = request.getParameter("phone");
	String birth = request.getParameter("birth");
	String grade = request.getParameter("name");
	String []subject = request.getParameterValues("subject");
	%>
	
	<%-- 2. 학생 정보 출력 --%>
	<h1><%= "학생 정보 페이지"%></h1>  
	<hr>
	이름 : <%= name %> <br>  
	비밀번호 : <%= password %><br>
	이메일 : <%= email %><br> 
	휴대폰 번호 : <%= phone %><br>
	생년월일 : <%= birth %><br>
  	학년 : <%= grade %><br>
	신청과목 : <% 
		for(String s : subject){  
			out.print(s + " ");
		   %><br>
</body>
</html>
