<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.sql.*"  %>
    
<%
	String id = request.getParameter("id");

	Class.forName("org.mariadb.jdbc.Driver");
	
	String url = "jdbc:mariadb://localhost:3307/backend";
	String user = "dhlee";
	String pass = "1111";
	Connection con = DriverManager.getConnection(url, user, pass);
	
	String sql = "delete from stumember where id = ?";
	PreparedStatement pstmt = con.prepareStatement(sql);
	pstmt.setString(1, id);
	
	int state = pstmt.executeUpdate();
	
	if(state == 1){
		out.println(id + "님의 정보가 삭제 되었습니다.");
	}
	else{
		out.println("실패했습니다.");
	}
	
	con.close();
	pstmt.close();
%>
	
<script>
		let ans = alert("삭제되었습니다!");
		if (!ans){
			location.href='list.jsp';
		}
</script>


