<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    // 쿠키 생성 (이름: userName, 값: 홍길동)
    String userName = java.net.URLEncoder.encode("홍길동", "UTF-8");
    Cookie cookie = new Cookie("userName", userName);
    cookie.setMaxAge(60 * 60 * 24); // 1일(초 단위)
    cookie.setPath("/"); // 모든 경로에서 사용
    response.addCookie(cookie);
%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
</head>
<body>
	  <h2>쿠키가 생성되었습니다!</h2>
    <a href="cookieRead.jsp">쿠키 읽기</a>
</body>
</html>