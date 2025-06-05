package cs.dit.member;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 * Servlet implementation class MemberUpload
 */
@MultipartConfig
@WebServlet("/upload")
public class MemberUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String photo = null;
		
		response.setContentType("text/html; charset=utf-8");
		
//		1.업로드 파일 저장
		String contentType = request.getContentType();
		
		if(contentType != null && contentType.toLowerCase().contains("multipart/")){
			ServletContext ctx = request.getServletContext();
			String dit = ctx.getRealPath("/photos");
			System.out.println(dit);
			
			File f = new File(dit);
			if (!f.exists()) {
				f.mkdirs();
			}
		}
		// b. Part 내에 들어있는 Content-Disposition속성값을 가져온다.
		Collection<Part> parts = request.getParts();
		for(Part p : parts) {
			if(p.getSize() > 0) {
				photo = p.getSubmittedFileName();
				String filepath = "/photos" + File.separator + photo;
				p.write(filepath);
			}
		}
		// c. 물리적으로 파일을 저장한다.
//			2. 데이터베이스에 정보 저장
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String pwd = request.getParameter("pwd");

		MemberDAO dao = new MemberDAO();
		MemberDTO dto = new MemberDTO(id, name, pwd, photo);
		
		dao.insert(dto);
		
		String viewPage = "/WEB-INF/views/list.jsp";
		
		RequestDispatcher rd = request.getRequestDispatcher(viewPage);
		rd.forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
