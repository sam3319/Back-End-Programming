<%@page import="cs.dit.member.MemberDTO"%>
<%@page import="cs.dit.member.MemberDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import ="java.sql.*, javax.naming.*, javax.sql.*" %>
<%	
	request.setCharacterEncoding("utf-8");

	String id = request.getParameter("id");
	String name = request.getParameter("name");
	String pwd = request.getParameter("pwd");
	String photo = request.getParameter("photo");

	MemberDAO dao = new MemberDAO();
	MemberDTO dto = new MemberDTO(id, name, pwd, photo);
	dao.insert(dto);
	
	
	response.sendRedirect("list.jsp");
%>
