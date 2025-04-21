## DAO와 DTO란 무엇인가?

**DAO**(Data Access Object)와 **DTO**(Data Transfer Object)는 JSP(자바 서버 페이지)와 같은 웹 애플리케이션에서 데이터베이스와의 연동을 효율적으로 처리하기 위해 자주 사용되는 객체 구조.
이 두 객체는 역할이 명확하게 구분되어 있으며, 코드의 유지보수성과 확장성을 높이는 데 중요한 역할을 한다.

---

**DAO (Data Access Object)**

- 데이터베이스에 직접 접근하여 데이터의 **추가, 조회, 수정, 삭제(CRUD)** 작업을 수행하는 객체
- 데이터베이스와 관련된 모든 로직(쿼리 실행, 연결 관리 등)을 DAO 클래스에 모듈화하여 구현한다.
- DAO를 사용하면 데이터베이스 접근 코드가 분리되어, 비즈니스 로직이나 프레젠테이션 로직과 독립적으로 관리할 수 있다.
- DAO는 보통 하나의 데이터 엔티티(예: 게시판, 회원 등)마다 하나씩 작성하며, 메서드로 select, insert, update, delete 등을 제공한다.

---

**DTO (Data Transfer Object)**

- 데이터베이스의 데이터를 **자바 객체 형태로 변환하여 전달**하는 객체
- DTO는 데이터만을 담는 역할을 하며, 일반적으로 **getter/setter** 메서드와 기본 생성자, 매개변수 생성자만을 가진다.
- 비즈니스 로직이나 데이터베이스 접근 로직은 포함하지 않는다.
- DTO는 데이터를 여러 계층(예: DAO ↔ Controller ↔ JSP) 사이에서 안전하게 전달하기 위해 사용된다.
- DTO는 VO(Value Object)라고도 부르며, VO는 읽기 전용(immutable) 속성을 갖는 경우가 많다.

---

## DAO와 DTO의 역할 비교

| 구분 | DAO | DTO |
| :-- | :-- | :-- |
| 풀네임 | Data Access Object | Data Transfer Object |
| 주요 역할 | DB 접근 및 데이터 처리(CRUD) | 데이터 전달 및 저장 |
| 포함 내용 | 쿼리 실행, DB 연결, 트랜잭션 관리 등 | 데이터 필드, getter/setter, 생성자 |
| 위치 | 데이터 접근 계층 | 계층 간 데이터 전달 |
| 비즈니스 로직 | 포함 가능 | 포함하지 않음 |
| 예시 | 게시글 목록 조회, 회원 정보 저장 등 | 게시글 정보, 회원 정보 등 |

---

## 예시 코드 구조

```java
// DTO 예시
public class BookDTO {
    private int id;
    private String title;
    private String author;

    public BookDTO() {}
    public BookDTO(int id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
    // Getter/Setter 생략
}

// DAO 예시
public class BookDAO {
    public ArrayList&lt;BookDTO&gt; selectAll() {
        // DB 연결 및 SELECT 쿼리 실행
        // 결과를 BookDTO 객체로 만들어 ArrayList에 담아 반환
    }
}
```

DAO는 데이터베이스 작업을, DTO는 데이터 전달을 담당하며, 둘을 함께 사용하면 코드가 명확하고 유지보수가 쉬워진다

---

## 정리

- **DAO**는 데이터베이스와 직접 소통하는 역할(데이터 CRUD).
- **DTO**는 데이터를 객체로 담아 계층 간 전달하는 역할(데이터 저장 및 전달).
- 이 두 객체를 분리해 사용하면 코드가 깔끔해지고, 유지보수 및 확장에 유리하다


