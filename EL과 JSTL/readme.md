## EL (Expression Language)

EL은 JSP 2.0 이상에서 제공되는 스크립트 언어로, 기존의 `<%=변수%>` 표현식 태그를 `${변수}` 형태로 간단하게 표현할 수 있게 해준다. JSP가 실행될 때 즉시 반영되며, 주로 객체 프로퍼티 값을 꺼낼 때 사용된다.

### **EL의 기본 문법**

EL의 기본 표현법은 `${ 표현식 }` 형태로 사용한다. 다음과 같은 다양한 형태의 데이터를 표현할 수 있다.

- **문자열**: `${'EL입니다'}` → "EL입니다" 출력
- **정수**: `${5}` → 5 출력
- **실수**: `${4/3}` → 1.3333333333333333 출력
- **불린**: `${param.num > 5}` → true 또는 false
- **null**: `${null}` → 공백 문자열


### **EL에서 사용 가능한 연산자**

EL은 다양한 연산자를 지원하며, HTML 태그나 JSP 내 자바코드와의 구분을 위해 영어 알파벳 연산자도 제공한다.


| 종류 | 연산자 | 설명 |
| :-- | :-- | :-- |
| 산술 연산자 | +, -, *, /, div, %, mod | 기본 수학 연산 |
| 비교 연산자 | ==, eq, !=, ne, >, gt, <, lt, >=, ge, <=, le | 값 비교 |
| 논리 연산자 | \&\&, and, \|\|, or, !, not | 논리 연산 |
| 특수 연산자 | empty, not empty | 값이 비어있는지 확인 |

### **속성 접근 방법**

EL은 JSP 내장 객체의 영역(application, session, request, page)에 저장된 속성에 접근할 수 있다. 속성 검색은 작은 범위에서 큰 범위 순으로 진행된다.

```jsp
${member}           // 모든 영역 검색
${sessionScope.member}  // 특정 영역 지정
${param.num}        // 파라미터 접근
```


## JSTL (JSP Standard Tag Library)

JSTL은 JSP에서 자주 사용하는 기능들을 모아 구현해 놓은 커스텀 태그 라이브러리. Apache 재단에서 개발했으며, 스크립트릿으로 작성해야 할 로직들을 태그 형태로 작성할 수 있게 해준다.

### **JSTL의 주요 라이브러리**

JSTL은 네 가지 주요 태그 라이브러리로 구성된다.

1. **코어 태그(Core Tags)**: 변수 설정, 조건문, 반복문 등의 기본 프로그래밍 로직
2. **포맷 및 국제화 태그**: 숫자, 날짜, 시간 형식 처리 및 다국어 지원
3. **SQL 태그**: 데이터베이스 상호작용을 위한 태그
4. **XML 태그**: XML 문서 처리를 위한 태그

### **JSTL 사용 설정**

JSTL을 사용하기 위해서는 다음과 같은 설정이 필요하다.

1. JSTL 라이브러리 파일(.jar)을 프로젝트의 `WEB-INF/lib/` 폴더에 추가
2. JSP 파일 상단에 태그 라이브러리 선언:
```jsp
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```


### **주요 JSTL 태그 사용법**

**변수 설정 및 제거**

```jsp
<c:set var="name" value="홍길동" />
<c:remove var="name" />
```

**조건문 처리**

```jsp
<c:if test="${age > 18}">
    <p>성인입니다.</p>
</c:if>

<c:choose>
    <c:when test="${name == '홍길동'}">
        홍길동님입니다.
    </c:when>
    <c:otherwise>
        다른 사용자입니다.
    </c:otherwise>
</c:choose>
```

**반복문 처리**

```jsp
<c:forEach items="${items}" var="item" varStatus="status">
    ${status.count}: ${item}
</c:forEach>

<c:forEach begin="1" end="5" var="num">
    ${num}
</c:forEach>
```

**파일 포함**

```jsp
<c:import url="header.jsp"></c:import>
```


## EL과 JSTL의 연동

EL과 JSTL은 함께 사용될 때 더욱 강력한 기능을 발휘. JSTL 태그의 속성값으로 EL 표현식을 사용할 수 있어, 동적인 웹 페이지 구성이 가능하다.

```jsp
<c:forEach items="${userList}" var="user">
    <c:if test="${user.age >= 20}">
        <p>${user.name}님은 성인입니다.</p>
    </c:if>
</c:forEach>
```


## 사용상 주의사항

**EL 사용 조건**: WAS 버전이 낮은 경우 JSP 페이지 상단에 `isELIgnored="false"` 옵션을 추가해야 한다.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" 
         pageEncoding="UTF-8" isELIgnored="false" %>
```

EL과 JSTL을 활용하면 JSP 페이지에서 자바 코드의 사용을 최소화하고, 더 읽기 쉽고 유지보수하기 좋은 코드를 작성할 수 있다.
이는 프레젠테이션 계층과 비즈니스 로직의 분리를 통해 MVC 패턴 구현에도 도움이 된다.
