<%@page import="javax.sql.*"%>
<%@page import="javax.naming.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.sql.*"  %>
    
<%
    // 1. Request Parameter 받기: 삭제할 ID를 가져옴
	String id = request.getParameter("id"); 

    // 2. Connection Pool에서 Connection 얻기
	Context initCtx = new InitialContext(); 
	DataSource ds = (DataSource)initCtx.lookup("java:comp/env/jdbc/dhlee"); 
	Connection con = ds.getConnection(); 

    // 3. PreparedStatement로 SQL Injection 방지
	String sql = "delete from stumember where id = ?"; 
	PreparedStatement pstmt = con.prepareStatement(sql); 
	pstmt.setString(1, id); 

    // 4. 쿼리 실행 및 결과 확인
	int state = pstmt.executeUpdate(); 
	if(state == 1){ 
		out.println(id + "님의 정보가 삭제 되었습니다."); 
	}
	else{ 
		out.println("삭제 실패!"); 
	}

    // 5. 리소스 해제: Connection Pool 반환
	con.close(); 
	pstmt.close(); 
%>
	
<script>
    // 6. 삭제 완료 알림 및 페이지 이동
	let ans = alert("삭제되었습니다!"); 
	if (!ans){ 
		location.href='list.jsp'; 
	}
</script>
