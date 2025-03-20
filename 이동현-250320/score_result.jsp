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
		double kor = Double.parseDouble(request.getParameter("kor"));
		double eng = Double.parseDouble(request.getParameter("eng"));
		double math = Double.parseDouble(request.getParameter("math"));
		
		double []len = {kor, eng, math};
		int sum = (int) kor + (int) eng + (int) math;
		double avg = (double)sum / len.length;
		
		out.print("국어 : " + (int)kor + "<br>");
		out.print("영어 : " + (int)eng + "<br>");
		out.print("수학 : " + (int)math + "<br>");
		out.print("총점 : " + sum +  "<br>");
		out.print("평균 : " + String.format("%.2f", avg));
	%>
</body>
</html>