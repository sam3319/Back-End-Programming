package cs.dit.member.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs.dit.member.MemberDAO;
import cs.dit.member.MemberDTO;

public class MemberUpdateService implements MemberService {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String pwd = request.getParameter("pwd");

		MemberDTO dto = new MemberDTO(id, name, pwd);
		MemberDAO dao = new MemberDAO();
		
		dao.update(dto);
		
	}

}