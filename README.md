# 🚀 simple-diary

리액트로 만드는 간단한 일기장

<br>

---

## 📌 간단한 프로젝트를 통해 React의 사용법을 배우기

- [x] 사용자 입력 및 배열 리스트 처리하기

  - 한 줄 입력 처리하기
  - 여러 줄 입력 처리하기
  - 선택 박스 입력 처리하기
  - 사용자 입력 데이터 핸들링하기
  - useState 사용하기

- [x] React에서 DOM 조작하기

  - 일기 저장 버튼을 클릭했을 때, 작성자와 일기가 정상적으로 입력되었는지 체크
  - 정해진 길이보단 작은 길이라면 해당 폼을 다시 focus하는 기능 추가
  - useRef 사용하기

### 📌 CRUD 기능 구현

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

- [x] React에서 리스트 데이터 수정하기 (Update)

  - 배열을 이용한 React의 List에 아이템을 동적으로 수정하는 기능
  - 수정하기 버튼은 각각의 아이템들에 들어가야 한다.
  - 수정폼 활성화의 상태를 불리언으로 관리한다.

- [x] React Lifecycle 과 API

  - 리액트의 생명주기 (Lifecycle)을 관리하고 제어하기
  - useEffect를 사용해서 LifeCycle 제어하기

- React App 성능 최적화와 도구 사용
- React 컴포넌트 트리에 전역 데이터 공급하기

<br>

---

## 사용한 명령어

```js
// create-react-app으로 프로젝트 생성
npx create-react-app diary

// 스타일드 컴포넌트 인스톨
npm i styled-components
```

<br>

---

## 컴포넌트와 데이터 구조파악하기

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

<br>

---

## 리액트의 Lifecyle 이해하기

> Lifecyle = 생애주기(생명주기)

**생애주기(Lifecycle)이란?**

일반적으로 시간의 흐름에 따라, 탄생부터 죽음에 이르는 순간에 따른 단계적인 과정을 의미한다.

소프트웨어 개발에서도 생애주기를 뜻하는 Lifecycle은 많이 사용된다.
인간의 생애주기와 비슷하게 소프트웨어의 탄생되고 종료되는 과정을 나타내기 위해 이런 단어를 자주 사용하게 된다.

React의 컴포넌트도 이런 생명주기인 LifeCycle을 갖는다.

![](https://velog.velcdn.com/images/ninto_2/post/2fb7235c-de3d-41d2-b45f-aea38bf19114/image.png)

리액트의 생애주기 (리액트 컴포넌트의 생애 주기)는 간단히 말해서 `탄생 -> 변화 -> 죽음`의 3가지 단계를 갖는다.

![](https://velog.velcdn.com/images/ninto_2/post/4dbcd511-3c8e-4280-9e97-62d755ab39e9/image.png)

**탄생**이라는 건 컴포넌트가 화면에 나타나는 **Mount 단계**를 의미한다.

**변화**라는건 state가 바뀌거나, 부모가 리렌더되거나, prop이 바껴서 컴포넌트 자신이 리렌더 되는 과정 즉, 업데이트 되는 단계를 나타낸다.
이 변화를 **Update 단계**라고 한다.

**죽음**이라는건 컴포넌트가 화면에서 사라지는 것을 말한다.
이 죽음을 **UnMount 단계**라고 한다.

컴포넌트가 탄생하고 변화하고 사라지고 죽는 순간에 어떤 작업을 할 수 있다는 것을 LifeCycle을 제어한다고 표현할 수 있다.

![](https://velog.velcdn.com/images/ninto_2/post/d96e3b05-61c8-42d0-9ad0-3aee4c402913/image.png)

리액트는 기본적으로 LifeCycle마다 실행할 수 있는 메서드를 가지고 있다.
아쉽게도 `ComponentDidMount, ComponentDidUpdate, ComponentWillUnmount`와 같은 메서드들은 Class형 컴포넌트에서 밖에 사용할 수 없다. (클래스형 컴포넌트)

![](https://velog.velcdn.com/images/ninto_2/post/280025e0-41bb-4c7d-9a7a-7f0d73fc1fb2/image.png)

지금까지 컴포넌트를 화살표 함수를 통해 함수형으로 제작하였다. (함수형 컴포넌트)
하지만 이런식으로 클래스형 컴포넌트에서만 사용할 수 있는 메서드들을 앞에 `use` 키워드를 붙여서
함수형 컴포넌트에서도 사용할 수 있게 되었다.

> React Hooks : 클래스형 컴포넌트에서 사용할 수 있는 기능을 낚아채서 함수형 컴포넌트에 사용할 수 있게 만든 기능들 (함수처럼 불러와서 사용할 수 있게 되었다.)

- `useState` : state 상태를 사용할 수 있도록 도와주는 함수
- `useRef` : DOM 요소, 레퍼런스를 사용할 수 있도록 도와주는 함수
- `useEffect` : 리액트의 LifeCycle을 제어할 수 있는 메서드를 훔쳐올 수 있는 기능 함수

React Hooks는 2019.06 정식 출시된 기능이다.
React Hooks까지 사용해가면서 함수형 컴포넌트를 사용하는 이유는 클래스형 컴포넌트가 가진 문제점들 때문이다.

- 클래스형 컴포넌트의 길어지는 코드 길이의 문제
- 중복코드와 가독성 문제

...등등을 해결하기 위해 등장하였다.

![](https://velog.velcdn.com/images/ninto_2/post/3e070883-8655-45c8-8d3e-73f28b4f2aa3/image.png)

리액트의 함수형 컴포넌트에서 LifeCycle을 제어하기 위해서 `useEffect`라는 hooks를 사용해야한다.
형태는 리액트에서 import 받아온뒤, 2개의 파라미터를 전달할 수 있다.

첫번째 파라미터로는 callback함수와 두번째 파라미터는 **Dependency Array**를 전달한다.

Dependency Array(의존성 배열)은 배열 내에 들어있는 값이 변화하면 첫번째 파라미터인 콜백함수가 다시 실행된다.
