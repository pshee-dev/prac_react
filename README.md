## React Practice

[React js 강좌 - 코딩앙마](https://www.youtube.com/playlist?list=PLZKTXPmaJk8J_fHAzPLH8CJ_HO_M33e7-)

- [x] React JS #1 강의 소개
- [x] React JS #2 설치(create-react-app)
- [x] React JS #3 컴포넌트, JSX
- [x] React JS #4 첫 컴포넌트 만들기
- [x] React JS #5 CSS 작성법(module css)
- [x] React JS #6 이벤트 처리(Handling Events)
- [x] React JS #7 state, useState
- [x] React JS #8 props
- [x] React JS #9 더미 데이터 구현, map() 반복문
- [x] React JS #10 라우터 구현 react-router-dom
- [x] React JS #11 json-server, REST API
- [x] React JS #12 useEffect, fetch()로 API 호출
- [x] React JS #13 Custom Hooks
- [x] React JS #14 PUT(수정), DELETE(삭제)
- [x] React JS #15 POST(생성), useHistory()
- [x] React JS #16 마치며
- [ ] React JS #17 부록 : 타입스크립트를 적용해보자!

---

## Notes

### #11 json-server
- json-server 설치

    ```bash
    npm install -g json-server
    ```

- json-server 실행 (json 경로, port 지정)

    ```bash
    json-server --watch ./src/db/data.json --port 3001
    ```

### #12 useEffect
- 렌더링 이후 실행되는 effect 처리
- 실행 순서: 렌더링 → DOM 반영 → useEffect 실행
- useEffect() 두번째 인자로 의존성 배열을 가짐<br>
    `useEffect(() => {}, [dependencies])`
    - 의존성 없음: 모든 렌더링 후 실행
    - 빈 배열: 마운트 시 1번 실행, 언마운트 시 cleanup 실행
    - 배열 값 포함: 배열의 변수가 바뀔 때마다 실행  
- fetch data

    ```javascript
    import { useEffect, useState } from 'react';

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/${id}`);
            const data = await res.json();
            setData(data);
        };

        fetchData();
    }, [id]);
    ```

### #15 useHistory → useNavigate
- React Router v6 부터 `useHistory` 삭제 → `useNavigate`로 대체됨

    ```javascript
    import { useNavigate } from "react-router-dom";

    const navigate = useNavigate();

    navigate("/home");        // push
    navigate(-1);             // 뒤로 가기
    navigate("/about", { replace: true }); // replace
    ```

### #16 day 이동 버튼 추가
- React 이벤트에서는 "함수 참조"를 넘겨야 하며, "실행 결과"를 넘기면 안됨

    ```js
    onClick={dayDelete}             // ⭕
    onClick={() => moveDay("prev")} // ⭕ 
    onClick={dayDelete()}           // ❌
    ```

    | 상황          | 작성 방법                     |
    | ----------- | ------------------------- |
    | 매개변수 없음     | `onClick={fn}`            |
    | 매개변수 있음     | `onClick={() => fn(arg)}` |
    | 함수 실행 결과 전달 | ❌ 절대 금지             |
