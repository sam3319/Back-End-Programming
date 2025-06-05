package cs.dit.member.service;

import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs.dit.member.MemberDTO;

public interface MemberService {
	

	public void execute(HttpServletRequest request, HttpServletResponse response);
}



