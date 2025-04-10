<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>게시글 내용</title>  <!-- 페이지 제목 변경 -->
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
		// 1. 파라미터 값 가져오기
		String title = request.getParameter("title"); 
		String text = request.getParameter("text");
		String name = request.getParameter("name");
		
		
	%>
	
		<%-- 2. 게시글 내용 출력 --%>
		<table>
			<thead>
				<th>제목</th>
				<td><%= title %></td>
				<th>작성자</th>
				<td><%= name %></td>
			</thead>
			<tbody>
				<tr> 
					<td colspan="4"><%= text %></td>
				</tr>
			</tbody>
		</table>
</body>
</html>
