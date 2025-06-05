	<%@page import="cs.dit.member.MemberDAO"%>
	<%@page import="cs.dit.member.MemberDTO"%>
	<%@ page language="java" contentType="text/html; charset=UTF-8"
	    pageEncoding="UTF-8"
	    import="java.sql.*, javax.naming.*, javax.sql.*" %>
	<% 	
		String id = request.getParameter("id");
		MemberDTO dto = new MemberDTO();
		MemberDAO dao = new MemberDAO();
		
		dto = dao.get(id);
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
			<form id="myForm" method="post">
			  <div class="form-group">
		      <label for="id">ID:</label>
		      <input type="text" class="form-control" id="id" name="id" value="${dto.id }" readonly>
		    </div>
		    <div class="form-group">
		      <label for="name">NAME:</label>
		      <input type="text" class="form-control" id="name" name="name" value="${dto.name }">
		    </div>
		    <div class="form-group">
		      <label for="pwd">PASSWORD:</label>
		      <input type="password" class="form-control" id="pwd" name="pwd" value="${dto.pwd }">
		    </div>
		    <br>
	<!--	<div class="text-center">
		    		<input type="submit" value="변경" class="btn btn-secondary">  
						<input type="button" value="삭제" class="btn btn-secondary" onclick="location.href='delete.do?id=${dto.id}'">
						<input type="button" value="목록" class="btn btn-secondary" onclick="location.href='list.do'">
				</div> -->
				<div class="text-center">
		    		<button class="btn btn-secondary" data-oper="modify">변경</button>
		    		<button class="btn btn-secondary" data-oper="remove">삭제</button>
		    		<button class="btn btn-secondary" data-oper="getlist">목록</button>
				</div>
			</form>
		</div>
		<script>
$(document).ready(function(){
	var myform = $("#myForm");
	
	$(".btn").click(function(e){
		e.preventDefault();
		
		var oper = $(this).data("oper");
		
		if(oper == "modify"){
			myform.attr("action", "update.do");
			myform.submit();
		}else if(oper == "remove"){
			myform.attr("action", "delete.do");
			myform.submit();
		}else if(oper == "getlist"){
			myform.attr("action", "list.do");
			myform.submit();
		}
	});
});
</script>

	</body>
	</html>