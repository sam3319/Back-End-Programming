<%@page import="java.util.LinkedList"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
</head>
<body>
<%
	String id = "kimsan";
	session.setAttribute("id", id);
	String list[] = {"moon", "sun", "jupiter", "mars", "venus", "mercury"};
	pageContext.setAttribute("list", list);
	
	List<String> namelist = new LinkedList<String>();
	namelist.add("홍길동");
	namelist.add("임꺽정");
	namelist.add("일지매");
	pageContext.setAttribute("nameList", namelist);
	%>
	${list[0]}<br>
	${list[1]}<br>
	${list[2]}<br>
	${list[3]}<br>
	${list[4]}<br>
	${list[5]}<br>
	
	${nameList[2]}<br>
	
	${id}<br>
	${header.accept}<br>
	23-11=${23-11}<br>
	parameter : ${param.name}
</body>
</html>