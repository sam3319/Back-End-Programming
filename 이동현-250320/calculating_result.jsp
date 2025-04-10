<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>계산 결과</title>
</head>
	<style>
		span{
			border: 1px solid black;
			padding: 10px;
		}
	</style>
<body>
<%
	// 1. 파라미터 값 가져오기
	double x = Double.parseDouble(request.getParameter("x"));
	double y = Double.parseDouble(request.getParameter("y"));
	double result;
	String op = request.getParameter("op");
	
	// 2. 연산자 종류에 따라 계산 수행
	switch(op){
		case "+" :
			result = x + y;
			out.print("<span>덧셈 결과는 : " + (int)result + "</span>");
			break;
		case "-" :
			result = x - y;
			out.print("<span>뺄셈 결과는 : " + (int)result + "</span>");
			break;
		case "*" :
			result = x * y;
			out.print("<span>곱셈 결과는 : " + (int)result + "</span>");
			break;
		case "/" :
			if (y == 0){
				out.print("<span>나눗셈 불능입니다. 0으로 나눌 수 없습니다.</span>");
			}
			else { 
				result = x / y;
				out.print("<span>나눗셈 결과는 : "+ result + "</span>");
			}
			
			break;
		default:
			out.print("<span>잘못된 연산자입니다.</span>");
			break;
	}
	%>
</body>
</html>
