<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
  <style>
    form{
      border: 1px solid black;
      width: 230px;
    }
  </style>
</head>
<body>
  
  <form action="score_result.jsp" method="get">
    국어 : <input type="text" name="kor">
    영어 : <input type="text" name="eng">
    수학 : <input type="text" name="math">

    <input type="submit" value="제출">
  </form>
</body>
</html>