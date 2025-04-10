<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>성적 계산 결과</title>  <!-- 페이지 제목 변경 -->
</head>
<body>
	<%
		// 1. 파라미터 값 가져오기
		double kor = Double.parseDouble(request.getParameter("kor"));
		double eng = Double.parseDouble(request.getParameter("eng"));
		double math = Double.parseDouble(request.getParameter("math")); 
		
		// 2. 총점 및 평균 계산
		double []len = {kor, eng, math};
		int sum = (int) kor + (int) eng + (int) math;
		double avg = (double)sum / len.length;
		
		// 3. 결과 출력
		out.print("국어 : " + (int)kor + "<br>");
		out.print("영어 : " + (int)eng + "<br>");
		out.print("수학 : " + (int)math + "<br>")
		out.print("총점 : " + sum +  "<br>");
		out.print("평균 : " + String.format("%.2f", avg)); 
	%>
</body>
</html>
