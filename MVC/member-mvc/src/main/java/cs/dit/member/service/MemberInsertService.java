package cs.dit.member.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs.dit.member.MemberDAO;
import cs.dit.member.MemberDTO;

public class MemberInsertService implements MemberService {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {

		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String pwd = request.getParameter("pwd");

		MemberDAO dao = new MemberDAO();
		MemberDTO dto = new MemberDTO(id, name, pwd);
		dao.insert(dto);
		

	}

}
