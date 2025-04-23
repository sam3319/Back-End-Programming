<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    Cookie[] cookies = request.getCookies();
    String userName = null;
    if (cookies != null) {
        for (Cookie c : cookies) {
            if ("userName".equals(c.getName())) {
                userName = java.net.URLDecoder.decode(c.getValue(), "UTF-8");
            }
        }
    }
%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
</head>
<body>
 <h2>쿠키 읽기 결과</h2>
    <% if (userName != null) { %>
        <p>userName 쿠키 값: <strong><%= userName %></strong></p>
    <% } else { %>
        <p>userName 쿠키가 없습니다.</p>
    <% } %>
    <a href="cookieUpdate.jsp">쿠키 수정</a> |
    <a href="cookieDelete.jsp">쿠키 삭제</a>
</body>
</html>
