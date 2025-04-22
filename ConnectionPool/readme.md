## JSP 커넥션풀(Connection Pool) 개념

커넥션풀은 데이터베이스와의 연결(Connection) 객체를 미리 여러 개 생성해 풀(pool)에 저장해 두고, 웹 애플리케이션에서 데이터베이스 작업이 필요할 때마다 이 풀에서 커넥션을 빌려 쓰고, 사용이 끝나면 다시 반환하는 방식입니다. 즉, 매번 새로운 커넥션을 생성·종료하지 않고, 이미 만들어진 커넥션을 재사용함으로써 효율적으로 DB 연결을 관리할 수 있다.

## 왜 커넥션풀이 필요한가?

- **성능 향상**: 매번 DB에 연결하고 해제하는 과정은 비용이 크고, 많은 트래픽 상황에서는 성능 저하의 원인이 된다. 커넥션풀을 사용하면 불필요한 커넥션 생성/종료 과정을 줄여 성능이 향상된다.
- **자원 관리**: 커넥션 개수를 제한해 DB에 과도한 부하가 걸리지 않도록 하고, 필요한 만큼만 커넥션을 유지해 서버 자원을 효율적으로 사용한다.
- **동시성 처리**: 여러 사용자가 동시에 접속해도 미리 준비된 커넥션을 빠르게 할당할 수 있어, 대기 시간을 줄일 수 있다.


## 동작 방식

1. **초기화**: 웹 컨테이너(WAS)가 실행될 때 미리 지정된 수만큼 커넥션 객체를 생성해 풀에 저장한다.
2. **할당**: 클라이언트 요청이 들어오면 커넥션풀에서 커넥션 객체를 빌려와 DB 작업을 수행한다.
3. **반환**: 작업이 끝나면 커넥션을 종료하지 않고 다시 풀에 반환해, 다음 요청에서 재사용할 수 있도록 한다.

## 설정 방법 (예시)

- **context.xml**에 리소스 정의:

```xml
&lt;Resource name="jdbc/mysql"
          type="javax.sql.DataSource"
          auth="Container"
          maxActive="30"
          maxIdle="3"
          maxWait="3000"
          username="DB사용자"
          password="DB비밀번호"
          driverClassName="com.mysql.cj.jdbc.Driver"
          url="jdbc:mysql://localhost:3306/DB이름?useSSL=false&amp;serverTimezone=UTC"/&gt;
```

- **web.xml**에 리소스 참조 추가:

```xml
&lt;resource-ref&gt;
    &lt;description&gt;Connection&lt;/description&gt;
    &lt;res-ref-name&gt;jdbc/mysql&lt;/res-ref-name&gt;
    &lt;res-type&gt;javax.sql.DataSource&lt;/res-type&gt;
    &lt;res-auth&gt;Container&lt;/res-auth&gt;
&lt;/resource-ref&gt;
```

- **JSP/Servlet에서 커넥션 사용**:

```java
Context initCtx = new InitialContext();
DataSource ds = (DataSource) initCtx.lookup("java:comp/env/jdbc/mysql");
Connection con = ds.getConnection();
```


## 커넥션풀의 주요 설정값

| 설정값 | 설명 |
| :-- | :-- |
| maxActive | 동시에 사용할 수 있는 최대 커넥션 개수 |
| maxIdle | 풀에 유지될 수 있는 최대 커넥션 개수 |
| minIdle | 최소로 유지할 커넥션 개수 |
| maxWait | 커넥션을 얻기 위해 대기할 최대 시간(밀리초) |
| initialSize | 풀에 최초로 생성해 둘 커넥션 개수 |

## 커넥션풀의 장점

- 커넥션 생성/종료에 소요되는 시간과 자원을 절약할 수 있다.
- 동시 접속자 수가 많아도 안정적으로 DB 연결을 제공한다.
- DB 연결 수를 제한해 과부하를 방지할 수 있다[^1_6][^1_7].
