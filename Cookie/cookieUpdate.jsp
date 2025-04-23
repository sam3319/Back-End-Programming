<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    // 쿠키 값 변경
    String userName = java.net.URLEncoder.encode("최민식", "UTF-8");
    Cookie cookie = new Cookie("userName", userName);
    cookie.setMaxAge(60 * 60 * 24); // 1일
    cookie.setPath("/");
    response.addCookie(cookie);
%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
</head>
<body>
    <h2>쿠키가 수정되었습니다!</h2>
    <a href="cookieRead.jsp">쿠키 읽기</a>
</body>
</html>
