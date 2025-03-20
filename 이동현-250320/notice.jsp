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
      width: 350px;
      height: 390px;
    }
    .text{
      width: 280px;
    }
    input, textarea{
      margin-left: 5px;
    }
    textarea{
      height: 200px;
    }
  </style>
</head>
<body>
  <form action="notice_result.jsp" method="get">
    제목 : <input class="text" type="text" name="title" placeholder="제목을 입력하세요. (20자 내외)" maxlength="20"><br>
    <hr>
    첨부파일 : <input type="file" name="file"> <hr>
    내용 : <textarea class="text" name="text" placeholder="작성할 내용을 적으시오 (500자 내외)." maxlength="500"></textarea>
    <hr>
    작성자명 : <input type="text" name="name"><br>
    <hr>
    <input type="submit" value="글쓰기">
  </form>
</body>
</html>