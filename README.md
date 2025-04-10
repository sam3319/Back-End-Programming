# 🌐 JSP (JavaServer Pages) 개요

> JSP는 Java를 기반으로 한 서버 사이드 웹 프로그래밍 기술입니다.  
> HTML 내에 Java 코드를 삽입하여 동적인 웹 페이지를 생성할 수 있습니다.

---

## 📌 JSP란?

- **JavaServer Pages**의 약자
- HTML 코드 안에 **Java 코드를 삽입**하여 서버에서 실행되는 웹 페이지를 작성
- JSP 파일은 실행 전에 **Servlet**으로 변환되어 동작함
- Java EE(Java Platform, Enterprise Edition)의 일부

---

## ⚙️ JSP 동작 방식

1. 클라이언트가 `.jsp` 페이지 요청
2. 웹 컨테이너(예: Tomcat)가 JSP를 **서블릿(Servlet) 코드로 변환**
3. 변환된 서블릿이 **컴파일되어 실행**
4. 생성된 HTML 결과를 클라이언트에게 전송


---

## 🧱 JSP 구성 요소

| 요소        | 설명                                           |
|-------------|------------------------------------------------|
| **지시자**   | `<%@ ... %>` : 페이지 설정 (`page`, `include` 등) |
| **스크립틀릿** | `<% ... %>` : Java 코드 작성 영역                    |
| **표현식**   | `<%= ... %>` : 출력하고 싶은 값을 HTML에 표시         |
| **선언부**   | `<%! ... %>` : 변수, 메서드 선언                       |
| **주석**     | `<%-- ... --%>` : JSP 주석 (브라우저에 보이지 않음)     |

---

## 📝 JSP 예시 코드

```jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head><title>JSP 예제</title></head>
<body>
  <%
    String name = "홍길동";
  %>
  <h1>안녕하세요, <%= name %> 님!</h1>
</body>
</html>
```

---

## 📂 JSP 파일 저장 위치 예시 (Tomcat 기준)

[톰캣폴더]/webapps/myapp/
└── index.jsp
└── login.jsp

브라우저에서 접근:
http://localhost:8080/myapp/index.jsp


