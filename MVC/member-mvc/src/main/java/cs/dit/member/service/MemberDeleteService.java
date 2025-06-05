package cs.dit.member.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs.dit.member.MemberDAO;

public class MemberDeleteService implements MemberService {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");

		MemberDAO dao = new MemberDAO();
		dao.delete(id);

	}

}
