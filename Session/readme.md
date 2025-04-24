## 세션(Session) 개념

- 세션은 **서버에 저장되는 사용자별 데이터 저장 공간**. 사용자가 웹 사이트에 접속하면 서버는 고유한 세션 ID를 생성하고, 이 ID를 통해 각 사용자를 구분한다.
- 세션 ID는 주로 쿠키(JSESSIONID)를 통해 클라이언트와 서버 사이에서 전달됩니다. 브라우저가 쿠키를 지원하지 않으면 URL 뒤에 세션 ID를 붙이는 방식(URL Rewriting)도 사용된다.


## 세션의 특징

- **보안성**: 세션 데이터는 서버에 저장되므로, 클라이언트에 저장되는 쿠키보다 보안성이 높다.
- **유지 시간**: 세션은 일정 시간(기본 30분) 동안 사용자의 활동이 없으면 자동으로 만료된다. 유지 시간은 `web.xml`의 `&lt;session-timeout&gt;` 태그나 `session.setMaxInactiveInterval()` 메서드로 설정할 수 있다.
- **저장 용량**: 서버의 메모리에 저장되기 때문에, 많은 사용자가 동시에 접속하면 서버에 부하가 될 수 있다.


## 세션 사용 방법

### 1. 세션 생성 및 접근

- JSP에서는 `session` 내장 객체를 통해 세션에 접근할 수 있다. 별도의 설정 없이 기본적으로 사용 가능하다.
- 또는 `request.getSession()` 메서드로 HttpSession 객체를 얻을 수 있다. 세션이 없으면 새로 생성하고, 있으면 기존 세션을 반환한다.


### 2. 세션에 데이터 저장/조회/삭제

- **저장**:

```java
session.setAttribute("key", value);
```

예시:

```java
session.setAttribute("userID", userID);
```

- **조회**:

```java
Object value = session.getAttribute("key");
```

예시:

```java
String userID = (String) session.getAttribute("userID");
```

반환 타입이 Object이므로 형변환이 필요하다.
- **삭제**:

```java
session.removeAttribute("key");
```

또는 세션 전체를 종료할 때는

```java
session.invalidate();
```

를 사용한다. 이 경우 세션에 저장된 모든 데이터가 삭제.


### 3. 세션 정보 확인

- 세션의 고유 ID: `session.getId()`
- 생성 시각: `session.getCreationTime()`
- 마지막 접근 시각: `session.getLastAccessedTime()`
- 세션 유지 시간: `session.getMaxInactiveInterval()`


### 4. 로그인 상태 유지 예시

- 사용자가 로그인에 성공하면 세션에 사용자 정보를 저장한다.
- 이후 다른 페이지에서도 세션에 저장된 정보를 통해 로그인 여부를 확인할 수 있다.


## 세션과 쿠키의 차이

| 구분 | 세션(Session) | 쿠키(Cookie) |
| :-- | :-- | :-- |
| 저장위치 | 서버 | 클라이언트(브라우저) |
| 보안 | 상대적으로 높음 | 상대적으로 낮음 |
| 용량 | 서버 메모리 한계 내에서 큼 | 브라우저마다 제한(4KB 등) |
| 사용목적 | 로그인 등 민감한 정보, 사용자별 상태 관리 | 비중요 데이터, 사용자 환경 저장 |

## 정리

- JSP에서 세션은 **서버가 사용자별로 상태를 유지**하기 위한 기본적인 방법.
- 로그인, 장바구니 등 **사용자별로 지속적으로 관리해야 하는 정보**를 저장할 때 주로 사용한다.
- `session` 내장 객체의 `setAttribute()`, `getAttribute()`, `invalidate()` 등을 활용해 세션을 관리할 수 있다.
