<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>document</title>
    <style>
    	table{
    		border: 1px solid black;
    	}
    </style>
</head>
<body>
		<h1>컴퓨터소프트웨어과 회원가입</h1>
		<hr>
    <form action="join_result.jsp" method="get">
    <table>
        <tr>
            <td class="fldname">Name</td>
            <td><input name="name" type="text" placeholder="이름을 입력해주세요." required></td>
        </tr>
         <tr>
            <td class="fldname">password</td>
            <td><input name="password" type="password"></td>
        </tr>
        <tr>
            <td class="fldname">E-mail</td>
            <td><input name="email" type="email" placeholder="이메일을 입력해주세요." required></td>
        </tr>
        <tr>
            <td class="fldname">Phone</td>
            <td><input name="phone" type="tel" size="20" placeholder="010-xxxx-xxxx" value="010-1234-5678"></td>
        </tr>
        <tr>
            <td class="fldname">생년월일</td>
            <td><input name= "birth" type="date" value="2024-04-05" required></td>
        </tr>

        <!-- 학년 -->
        <tr>
            <td class="fldname">학년</td>
            <td>
                <label><input type="radio" name="grade" value="1학년"> 1학년</label>
                <label><input type="radio" name="grade" value="2학년"> 2학년</label>
            </td>
        </tr>
        <!-- 수강과목 -->
        <tr>
            <td class="fldname">수강과목</td>
            <td>
                <label><input name="subject" type="checkbox" value="프론트엔드프로그래밍1">프론트엔드프로그래밍</label><br>
                <label><input name="subject" type="checkbox" value="컴퓨터구조">컴퓨터구조</label><br>
                <label><input name="subject" type="checkbox" value="사물인터넷">사물인터넷</label><br>
                <label><input name="subject" type="checkbox" value="인공지능입문">인공지능입문</label><br>
                <label><input name="subject" type="checkbox" value="자료구조">자료구조</label><br>
                <label><input name="subject" type="checkbox" value="C프로그래밍">C프로그래밍</label><br>
            </td>
        </tr>

        <!-- ------------------------------------------------------------------------------------------------- -->
        <tr>
            <td class="fldname"></td>
            <td><input class="submit-box" type="submit" ></td>
        </tr>
          
    </table> 
    </form>          
</body>
</html>