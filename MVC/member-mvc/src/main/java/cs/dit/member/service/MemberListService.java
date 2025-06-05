package cs.dit.member.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs.dit.member.MemberDAO;
import cs.dit.member.MemberDTO;

public class MemberListService implements MemberService {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		// DB연동
		System.out.println("ListService 입니다");
		
		
		MemberDAO dao = new MemberDAO();
		ArrayList<MemberDTO> dtos = dao.list();
		request.setAttribute("dtos", dtos);
		
	}

}
