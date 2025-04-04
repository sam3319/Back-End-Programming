# 🗂️ 06장: 데이터베이스를 이용한 프로그래밍

> Java 애플리케이션과 데이터베이스의 연동 방법을 학습합니다.  
> 주요 개념: JDBC, SQL 실행, 리소스 해제 등

---

## 🔗 1. 데이터베이스 연동 개요
- 프로그램 ↔ 데이터베이스 연결
- 데이터를 조회, 입력, 수정, 삭제 가능
- Java에서는 **JDBC API**를 통해 DB 연동

---

## ⚙️ 2. JDBC(Java Database Connectivity)

### 📌 주요 구성 요소
- **DriverManager**: 드라이버 로드, DB 연결 요청
- **Connection**: DB 연결 객체
- **Statement**: SQL 실행 객체
- **ResultSet**: SQL 결과 저장 객체

### ✅ 처리 절차
1. JDBC 드라이버 로드
2. 데이터베이스 연결 생성
3. Statement 또는 PreparedStatement 생성
4. SQL 실행
5. 결과(ResultSet) 처리
6. 리소스 해제 (`close()`)

---

## ⚖️ 3. Statement vs PreparedStatement

| 항목 | Statement | PreparedStatement |
|------|-----------|-------------------|
| SQL 구성 방식 | 문자열 직접 삽입 | `?`로 매개변수 처리 |
| 성능 | 느림 (매번 SQL 분석) | 빠름 (미리 컴파일됨) |
| 보안 | SQL Injection 취약 | 보안에 유리 |

---

## 💻 4. JDBC 활용 예시

```java
String sql = "SELECT * FROM users WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, 1);
ResultSet rs = pstmt.executeQuery();
