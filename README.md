# 🚀 simple-diary

리액트로 만드는 간단한 일기장

## 📌 간단한 프로젝트를 통해 React의 사용법을 배우기

- [x] 사용자 입력 및 배열 리스트 처리하기

  - 한 줄 입력 처리하기
  - 여러 줄 입력 처리하기
  - 선택 박스 입력 처리하기
  - 사용자 입력 데이터 핸들링하기

- [x] React에서 DOM 조작하기

  - 일기 저장 버튼을 클릭했을 때, 작성자와 일기가 정상적으로 입력되었는지 체크
  - 정해진 길이보단 작은 길이라면 해당 폼을 다시 focus하는 기능 추가

- [x] React에서 리스트 사용하기 (Read)

  - `Array.map((it) => <Component key={it.id}{...it}/>)`
  - 작성이 완료된 일기들을 배열에 저장해서 불러오기
  - 배열을 이용해서 React에서 List를 렌더링해보고 개별적인 컴포넌트로 만들어보기
  - 배열은 게시글이나 리스트, 피드를 표시하는데 자주 사용됩니다.

- [x] React에서 리스트에 데이터 추가하기 (Create)

  - 배열을 이용한 React의 List에 item을 동적으로 추가하기
  - 작성 폼에 데이터를 실제로 추가하고 렌더링 구조 파악하기

- [x] React에서 리스트에 데이터 삭제하기 (Delete)

  - 일기 아이템은 DiaryItem의 삭제버튼을 구현하고, 클릭시 해당 일기 데이터를 삭제하는 기능
  - 삭제버튼은 각각의 아이템들에 들어가야 한다.

- React Lifecycle 과 API
- React App 성능 최적화와 도구 사용
- React 컴포넌트 트리에 전역 데이터 공급하기

- [x] React에서 리스트 데이터 수정하기 (Update)

  - 배열을 이용한 React의 List에 아이템을 동적으로 수정하는 기능
  - 수정하기 버튼은 각각의 아이템들에 들어가야 한다.

### 사용한 명령어

```js
// create-react-app으로 프로젝트 생성
npx create-react-app diary

// 스타일드 컴포넌트 인스톨
npm i styled-components
```

### 컴포넌트와 데이터 구조파악하기

![](https://velog.velcdn.com/images/ninto_2/post/6993802c-d110-4734-bcc6-ecac5ac12c99/image.png)

App 컴포넌트 자식 컴포넌트로 DiaryEditor 컴포넌트(작성 입력 폼 컴포넌트)와 DiaryList 컴포넌트(데이터 출력 컴포넌트)가 있습니다.

![](https://velog.velcdn.com/images/ninto_2/post/9cce89aa-edaf-4d84-bf0c-23fe3daeaf5a/image.png)

DiaryEditor 작성 입력 폼 컴포넌트에서 일기 아이템을 추가해서 해당 아이템을 DiaryList 데이터 출력 컴포넌트에서 출력해야되는 구조입니다.

![](https://velog.velcdn.com/images/ninto_2/post/313fc715-ddc1-453d-9af1-3135e16fc40a/image.png)

하지만 리액트에서는 같은 레벨의 형제 컴포넌트끼리는 전달할 수 없습니다.

![](https://velog.velcdn.com/images/ninto_2/post/e29f5fd6-592d-4cbf-af4d-0ae839f75dbb/image.png)

리액트에서는 이런식으로 단방향으로만 데이터가 흐릅니다.
(단방향 데이터 흐름)

이때는 리액트의 상태인 state를 DiaryEditor와 DiaryList의 공통 부모인 App 컴포넌트로 끌어올려서 해결을 할 수 있습니다.

![](https://velog.velcdn.com/images/ninto_2/post/31133799-4430-474b-b696-3516811c7a21/image.png)

App 컴포넌트가 일기 데이터를 배열 형식의 state로 가지고 있고, 이 data state의 값을 출력폼인 DiaryList에 props로 전달하면서 리스트를 렌더링하게 하고, 이 data의 state를 변화시킬 수 있는 상태변화 함수인 setData를 입력폼인 DiaryEditor에게 props으로 전달하게 합니다.

**렌더링 구조**

![](https://velog.velcdn.com/images/ninto_2/post/a85b0007-e4ab-42f7-ab72-e57480e786cc/image.png)

이렇게 구조를 작성하면 단방향 데이터 흐름을 갖는 리액트에서 데이터의 추가와 보여지는 문제를 해결할 수 있습니다.

![](https://velog.velcdn.com/images/ninto_2/post/40c32ad4-3b19-4b6b-9a2b-f4cbb4616c6f/image.png)

리액트로 만든 컴포넌트들은 트리형태의 구조를 띄며,
데이터는 아래로만 움직이는 단방향 데이터의 흐름을 가지고 있습니다.

추가, 수정, 삭제같은 event들은 setData와 같은 상태변화함수를 props로 전달해서 오히려 아래에서 위로 올라가는 구조라고 생각해 볼 수 있습니다.

여러개로 엮인 컴포넌트들을 공통 부모의 state로 설정하여 문제를 해결하는 방법을 state 끌어올리기 라고
말할 수 있습니다.
(단방향 흐름과 역방향 이벤트 흐름)
