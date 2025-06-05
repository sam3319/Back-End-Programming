package cs.dit.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import cs.dit.member.MemberDAO;
import cs.dit.member.MemberDTO;
import cs.dit.service.MemberService;
import cs.dit.service.MemberServiceImple;


@WebServlet("*.do")
@MultipartConfig
public class MemberUpload extends HttpServlet {
	private static final long serialVersionUID = 1L; 

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");
		

		String viewPage = "";
		String uri = request.getRequestURI();
		String com = uri.substring(uri.lastIndexOf("/")+1, uri.lastIndexOf(".do"));
		
		if(com!=null && com.equals("insertForm")) {
			viewPage = "/WEB-INF/views/insertForm.jsp";	// WEB-INF에 있는 insertForm.jsp 호출
			
		}else if(com!=null && com.equals("insert")) {
			MemberService service = new MemberServiceImple();
			service.insertPro(request, response);	// insertPro 메소드 호출
			viewPage = "list.do";
		 	
		}else if(com!=null && com.equals("list")) {
			MemberService service = new MemberServiceImple();
			service.listPro(request, response);		// listPro 메소드 호출
			viewPage = "/WEB-INF/views/list.jsp";
			
		}else if(com!=null && com.equals("get")) {
			MemberService service = new MemberServiceImple();
			service.getPro(request, response);		// getPro 메소드 호출
			viewPage = "/WEB-INF/views/updateForm.jsp";
			
		}else if(com!=null && com.equals("update")) {
			MemberService service = new MemberServiceImple();
			service.updatePro(request, response);	// updatePro 메소드 호출
			viewPage = "list.do";
			
		}else if(com!=null && com.equals("delete")) {
			MemberService service = new MemberServiceImple();
			service.deletePro(request, response);	// deletePro 메소드 호출
			viewPage = "list.do";
		}else if(com!=null && com.equals("index")) {
			viewPage = "/WEB-INF/views/index.jsp";	// WEB-INF에 있는 index.jsp 호출
		}
		RequestDispatcher rd = request.getRequestDispatcher(viewPage);
		rd.forward(request, response);				// resquest scope 객체에 클라이언트 정보들을 담아서 forward 
	}
	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}