<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
  <style>
    body{
        display: flex;
    }
  	#container{
  		border: solid 1px black;
        text-align: center;
        width: 200px;
        height: 90px;
  	}
    .co-bt{
        margin-right: 90px;
    }
    #result{
        border: 1px solid black;
        width: 300px;
        height: 40px;
        margin-left: 100px;
        margin-top: 20px;
    }
  </style>
</head>
<body>
	<form id="container" action="calculating_result.jsp" method="get">
		x: <input type="text" name="x">
		y: <input type="text" name="y">
		
      <div class="co-bt">
		    <input type="submit" name="op" value="+">
		    <input type="submit" name="op" value="-">
		    <input type="submit" name="op" value="*">
		    <input type="submit" name="op" value="/">
      </div>
	</form>

</body>
</html>