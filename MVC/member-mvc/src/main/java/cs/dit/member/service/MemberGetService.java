package cs.dit.member.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs.dit.member.MemberDAO;
import cs.dit.member.MemberDTO;

public class MemberGetService implements MemberService {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");
		MemberDTO dto = new MemberDTO();
		MemberDAO dao = new MemberDAO();
		
		dto = dao.get(id);
		
		request.setAttribute("dto", dto);
	}

}
