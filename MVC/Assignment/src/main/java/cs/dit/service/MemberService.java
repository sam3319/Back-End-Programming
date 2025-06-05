package cs.dit.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface MemberService {
	public void listPro(HttpServletRequest request, HttpServletResponse response);
	public void insertPro(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException;
	public void updatePro(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException;
	public void getPro(HttpServletRequest request, HttpServletResponse response);
	public void deletePro(HttpServletRequest request, HttpServletResponse response);
}
