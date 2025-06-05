## DAO (Data Access Object)

DAO는 **데이터베이스의 데이터에 접근하기 위한 객체**로, 데이터베이스 접근 로직과 비즈니스 로직을 분리하기 위해 사용된다. DAO는 실제로 데이터베이스에 접근하여 데이터를 삽입, 삭제, 조회, 수정 등의 **CRUD 기능을 수행**하며, Service와 데이터베이스를 연결하는 고리 역할을 한다.

**DAO의 주요 특징:**

- 데이터베이스와의 상호작용을 담당하는 객체
- 비즈니스 계층과 데이터 액세스 계층 간의 인터페이스 제공
- Spring에서는 **Repository 패키지가 바로 DAO**에 해당합니다
- 데이터베이스 연결을 위한 Connection 설정까지 포함하는 경우가 많음

```java
@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;
    
    public void save(Member member) {
        em.persist(member);
    }
    
    public Member findOne(Long id) {
        return em.find(Member.class, id);
    }
    
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }
}
```


## DTO (Data Transfer Object)

DTO는 **계층 간 데이터 교환을 위한 객체**로, 데이터를 전달하기 위한 순수한 데이터 객체이다. DTO는 로직을 가지지 않고 데이터와 그 데이터에 접근하기 위한 **getter, setter만을 가지고 있다.

**DTO의 주요 특징:**

- 여러 계층(Layer) 간 데이터를 주고받을 때 사용
- 주로 **View와 Controller 사이에서 활용**된다.
- 비즈니스 로직을 포함하지 않으며, 단순히 데이터 전달 목적으로 사용
- Database에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체

```java
@Getter
@Setter
static class ResponseDto {
    private String name;
    private String result = "결과입니다.";
    
    public ResponseDto(Member member) {
        name = member.getName();
    }
}
```


## DAO와 DTO의 차이점

| 구분 | DAO | DTO |
| :-- | :-- | :-- |
| **목적** | 데이터베이스 접근 | 데이터 전송 |
| **역할** | DB와의 상호작용 처리 | 계층 간 데이터 교환 |
| **포함 내용** | CRUD 로직, DB 연결 | getter/setter만 포함 |
| **사용 위치** | Service와 DB 사이 | View, Controller, Service 간 |
| **Spring 구현** | Repository 패키지 | 데이터 전송용 클래스 |

## 실제 사용 예시

DAO와 DTO는 함께 사용되어 효율적인 데이터 처리를 가능하게 한다.. DAO는 데이터베이스와의 상호작용을 처리하고 CRUD 작업을 수행하는 데 특화되어 있으며, DTO는 네트워크나 API를 통해 데이터를 주고받는 역할을 담당한다.

Entity를 직접 클라이언트에게 반환하는 대신 DTO로 변환하여 **원하는 데이터만 선별적으로 전송**할 수 있으며, 이를 통해 DB와 View 사이의 역할을 철저히 분리할 수 있다.
