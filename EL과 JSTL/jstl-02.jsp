<%@page import="cs.dit.Test"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
    
<%
	Test t = new Test("gildong", "홍길동");
	pageContext.setAttribute("t", t);
%>
    
    
    
    
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
</head>
<body>
	${t.id }
	${t.name }
</body>
</html>