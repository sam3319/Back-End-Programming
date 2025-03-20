<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
  <style>
  	table{
  		border: 1px solid black;
  		width: 500px;
  		height: 300px;
  	}
  </style>
</head>
<body>
	<%
		String title = request.getParameter("title");
		String text = request.getParameter("text");
		String name = request.getParameter("name");
		
		
	%>
	
		<table>
			<thead>
				<th>제목</th>
				<td><%= title %></td>
				<th>작성자</th>
				<td><%= name %></td>
			</thead>
			<tbody>
				<td><%= text %></td>
			</tbody>
		</table>
</body>
</html>