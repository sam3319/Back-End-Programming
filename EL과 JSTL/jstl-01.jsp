<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
</head>
	<c:set var="score" value="${param.score}"/>
	
	<c:if test = "${empty param.score}">
		<c:out value= "매개변수값이 비어있습니다"/>
	</c:if>
	<c:if test = "${not param.score}">
		<c:out value="${param.score }"/>
	</c:if>
	<%--${empty param.score ? "매개변수값이 비어있습니다" : param.score}<br><--%>
		
	<c:set var = "loginid" value="gildong"/>
	<c:set var = "name" value="홍길동"/>
	
	<c:if test = "${loginid == 'gildong' && name == '홍길동'}">
		아이디는 ${loginid }이고, 이름은 ${name }입니다!
	</c:if> 	
	
	
</html>