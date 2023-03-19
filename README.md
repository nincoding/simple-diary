# 🚀 simple-diary

리액트로 만드는 간단한 일기장

![간단한 일기장 프로젝트](https://user-images.githubusercontent.com/112839119/226212938-19ea82a9-eafe-473c-ac3d-ec49a9fda613.gif)

**초기 App 구조**

![](https://velog.velcdn.com/images/ninto_2/post/ec2aee44-457d-48e0-b310-78df8d13b680/image.png)

App 컴포넌트에서 사용하지 않는 onRemove, onEdit과 같은 상태변화함수들은 props 드릴링을 거치게 된다.
이런 문제를 해결하기 위해 Provider라는 공급자 컴포넌트를 만들어서 자신이 가지고 있는 모든 data를 준다.

**리팩토링 App 구조**

![](https://velog.velcdn.com/images/ninto_2/post/20e2070b-40f8-46ac-b3e3-ac4befe55d03/image.png)

## 사용한 명령어

```js
// create-react-app으로 프로젝트 생성
npx create-react-app diary

// 스타일드 컴포넌트 인스톨
npm i styled-components
```

<br>

---

## 📌 간단한 프로젝트를 통해 React의 사용법을 배우기

### 🍀 기본적인 리액트 사용법과 useState, useRef 사용하기

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

### 🍀 CRUD 기능 구현

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

### 🍀 useEffect를 이용한 LifeCycle 제어하기

- [x] React Lifecycle 과 API

  - 리액트의 생명주기 (Lifecycle)을 관리하고 제어하기
  - useEffect를 사용해서 LifeCycle 제어하기
  - 리액트에서 API 호출하기
  - useEffect를 사용해서 컴포넌트 Mount 시점에 API를 호출하고 해당 API의 결과값을 일기 데이터의 초기값으로 이용한다.
  - 자바스크립트의 내장함수 fetch를 사용해서 API를 호출해본다.

### 🍀 useMemo, useCallback을 이용한 최적화하기

- [x] React App 성능 최적화와 도구 사용

  - React Developer Tools RDT 개발자 도구 사용하기
  - React Developer Tools를 이용해 어떤 컴포넌트가 최적화의 대상인지 찾아낸다.
    (DiaryList에서 일기삭제 시 DiaryEditor가 리렌더 되지않도록 수정한다.)
  - useMemo를 이용한 연산 결과 재사용하기
  - 메모이제이션 기법을 적용한 연산최적화
  - 현재 일기 데이터를 분석하는 함수를 제작하고, 해당 함수가 일기 데이터의 길이가 변화하지 않을때 값을 다시 계산하지 않도록 구현
  - React.memo를 이용한 컴포넌트 재사용
  - useCallback을 이용한 함수 재사용
  - 아이템 리렌더링 최적화하기

### 🍀 useReducer를 사용한 복잡한 상태변화 로직 분리

- [x] App컴포넌트의 상태변화함수를 컴포넌트 밖으로 분리시키기

  - reducer, dispatch, action의 흐름파악

### 🍀 React 컴포넌트 트리에 전역 데이터 공급하기

- [ ] Context API를 이용한 컴포넌트 트리 데이터 공급

  - props 드릴링 문제를 해결한다.

<br>

---

## 📌 컴포넌트와 데이터 구조파악하기

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

## 📌 리액트의 Lifecyle 이해하기

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

<br>

---

## 📌 리액트에서 API 사용하기

해당 프로젝트에서는 무료로 API를 이용할 수 있는 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)사이트를 이용한다.

![](https://velog.velcdn.com/images/ninto_2/post/3b15ebb0-9bd3-4ccc-8bbd-2a8eee0331d7/image.png)

Resources를 제공해주는 tap에서 어떤 API서비스로 자원을 가져다 쓸 수 있는지 제공해주었다.
일기데이터와 가장 비슷해보이는 comments에 들어가보면 JSON 형태로 생긴 객체배열이 나타난다.

```js
//  comments 객체배열의 형태
[
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  ...
]
```

API를 호출하려면 주소를 알아야한다.
comment tap을 클릭해서 접속한 URL 주소를 이용한다.

```
https://jsonplaceholder.typicode.com/comments
```

<br>

---

## 📌 React Developer Tools

![](https://velog.velcdn.com/images/ninto_2/post/93fbef3f-37cc-45d5-a491-f7345d1a0b3a/image.png)

React Developer Tools는 Chrome의 확장 도구이다.

크롬 웹 스토어에서 확장도구에서 설치할 수 있다.
도구 더보기에서 확장 프로그램에 들어가서 확장프로그램 사용을 ON 시켜준다.
세부정보에서 사이트 엑세스를 모든 사이트에서로 바꿔주어야 한다.
그 다음, 파일 URL에 대한 액세스 허용한다.

![](https://velog.velcdn.com/images/ninto_2/post/71ca8229-dbaa-4a4e-ae31-eb4ee3a38271/image.png)

이런식으로 개발자도구에 들어가서 Component로 확인할 수 있다.
각각의 컴포넌트가 어떤 데이터와 props, state를 가지고 있는지 직관적으로 확인할 수 있다.

<br>

---

## 📌 메모이제이션 기법 (Memoization)

![](https://velog.velcdn.com/images/ninto_2/post/66064c1c-79cd-4f28-bc1d-19c6a7b96b31/image.png)

메모이제이션이라는 건 프로그래밍 기법에 가까운 이야기이다.
'메모를 해둔다'라는 뜻으로, 이미 계산해본 결과를 기억해 두었다가 똑같은 계산을 시키면 답만 반환하는 방법을 의미한다.

답을 찾은적이 있고, 기억해두었다면 다시 연산을 할 필요없이 기억해두었던 답을 반환하기만 하면 된다.

![](https://velog.velcdn.com/images/ninto_2/post/b1c75132-1a2a-4532-b2d3-763bb80a09c0/image.png)

컴퓨터의 특성에 메모이제이션 기법을 이용해서 프로그래밍을 하다가 만나는 문제를 해결하는 경우가 많다.

### React.memo 최적화

컴포넌트를 재사용할 수 있는 **React.memo**에 대해 알아보자.

**렌더링 상황 이해하기**

![](https://velog.velcdn.com/images/ninto_2/post/0f0de4fa-af1d-4487-916d-83dbc0082d8d/image.png)

CountView와 TextView 컴포넌트를 자식으로 갖는 App에서 상태값을 각각 prop로 전달해주고 있을때 오른쪽 코드를 실행하면 어떻게 렌더링되는지 살펴보자.

![](https://velog.velcdn.com/images/ninto_2/post/0fd7dce4-94c0-49ed-918d-2c382e1e4d48/image.png)

처음으로 `setCount(10);`이 실행되면서 App컴포넌트의 count 값이 바뀌게 되고 state가 업데이트 되었기 때문에 해당 state를 가진 App컴포넌트는 리렌더링된다.

그러면 prop인 count가 바뀌게되고 CountView컴포넌트도 렌더링되게 된다.
하지만 count prop을 사용하고 있지 않는 TextView 또한 리렌더 되게 된다.
그 이유는 부모컴포넌트가 리렌더 되면 자식컴포넌트 또한 리렌더 되기때문이다.

이런 상황에서 연산의 낭비가 발생하게 된다. (성능상의 문제)

![](https://velog.velcdn.com/images/ninto_2/post/2d608ab9-fee6-4c3d-b88b-797edf89d943/image.png)

위처럼 자식 컴포넌트들한테 각각 업데이트 조건을 설정해주면 state에 따라 그 state를 사용하지않는 자식 컴포넌트는 리렌더링에서 제외할 수 있게 된다.

이런 기능을 `React.memo`에서 사용할 수 있다. (함수형 컴포넌트에 업데이트 조건 설정)

리액트의 여러가지 기능들을 알아보기 위한 가장 좋은 방법은
[리액트의 공식문서-React.memo](https://ko.reactjs.org/docs/react-api.html#reactmemo)를 참고하는 방법이다.

> React.memo는 고차 컴포넌트(Higher Order Component)입니다. - 리액트 공식문서

> 고차 컴포넌트(HOC, Higher Order Component)는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수입니다. (컴포넌트 로직을 재사용하기 위한 React의 고급 기술)

```js
// 고차컴포넌트
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

```js
// React.memo 사용법
const MyComponent = React.memo(function MyComponent(props) {
  /* props를 사용하여 렌더링 */
});
```

컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다.

간단하게 말해서 똑같은 prop을 받으면 다시 컴포넌트를 계산하지 않는다.

즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.
(React.memo로 리렌더링 되지 않았으면 하는 컴포넌트를 감싸주게 되면 prop가 바뀌지 않으면 리렌더링하지 않는 강화된 컴포넌트를 돌려주겠다라는 뜻임 - 물론 자기자신의 state가 바뀌면 리렌더링 된다.)

React.memo는 props 변화에만 영향을 줍니다.

React.memo로 감싸진 함수 컴포넌트 구현에 useState, useReducer 또는 useContext 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링됩니다.

**자바스크립트의 객체비교**

![](https://velog.velcdn.com/images/ninto_2/post/e71b4d92-a770-4fcf-9203-7ea9316a0f58/image.png)

값과 형태가 같지만 비교결과가 같지 않은이유는 자바스크립트가 객체나 함수, 배열같은 비원시타입을 비교할때 값에 의한 비교가 아닌 주소에 의한 비교를 하기 때문이다. (얕은 비교)

각각 객체를 생성해서 할당하게 되면 고유한 메모리 주소를 가지게 된다.
얕은 비교라는것은 이 두 객체가 같은 주소에 있느냐를 비교하기 때문에 값이 같더라도 주소가 다르다면 다르다는 결과값을 출력하게 된다.

![](https://velog.velcdn.com/images/ninto_2/post/08f660f9-322c-4147-858b-1ff6549574d1/image.png)

하지만 이런식으로 사용하면 같다고 나오게 된다.

```js
function MyComponent(props) {
  /* props를 사용하여 렌더링 */
}
function areEqual(prevProps, nextProps) {
  /*
  nextProps가 prevProps와 동일한 값을 가지면 true를 반환하고, 그렇지 않다면 false를 반환
  */
}
export default React.memo(MyComponent, areEqual);
```

React.memo가 두번째인자로 `areEqual`이라는 함수인자를 받는것을 확인할 수 있는데, 이 함수는 이전의 prop와 이후의 prop를 받고 동일한 값이라면 true와 그렇지않다면 false를 반환하는 비교함수로서 사용하기 때문이다.

이 `areEqual`함수를 이용해서 기존의 얕은비교를 하게하지않고 여기에서 코드를 변경하여 깊은비교를 구현한다면 true를 가질때 렌더링하지 않게하고 false를 가질때 렌더링하게 할 수도 있다.

<br>

### useCallback 최적화

```js
// 첫번째 인자로 callback을 두번째 인자로 의존성 배열을 받는다.
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

useCallback의 기능은 메모이제이션된 콜백을 반환합니다.
값을 반환하는 것이 아니라, 첫번째 인자로 전달된 콜백을 다시 반환한다고 생각할 수 있다.
주의할 것은 메모이제이션된 콜백을 반환한다는 점이다.

즉, 두번째 값인 의존성 배열이 변화하지 않으면 첫번째 인자로 전달된 콜백함수를 재사용할 수 있도록 도와주는 리액트 hooks이다.

<br>

### useReducer로 상태변화 로직 분리하기

![](https://velog.velcdn.com/images/ninto_2/post/902c9d5d-75d4-4c3a-b6e9-369a02470d61/image.png)

가장 복잡하고 많은 상태 로직을 가진 컴포넌트는 App컴포넌트입니다.
이 App 컴포넌트는 onCreate, onEdit, onRemove 등의 많은 상태변화함수가 존재했습니다.

이 상태변화함수들은 컴포넌트 내에만 존재해야했고, 그 이유는 상태를 업데이트하기 위해선 기존의 상태를 참조해야했기 때문입니다.

상태변화함수에서 인자로 전달받고있는 data들은 전부 컴포넌트안에 있는 data를 가져다 써야하기 때문에 함수 밖에서는 처리할 수 없었습니다.

하지만 컴포넌트의 코드가 길어지고 무거워지는건 리팩토링이 필요한 부분입니다.

이 상태변화로직을 함수의 밖으로 분리하는 기능을 추가했습니다.

이러한 기능을 **useReducer**를 이용하여 컴포넌트에서 상태변화 로직 분리작업을 수행할 수 있습니다.

![](https://velog.velcdn.com/images/ninto_2/post/35ac52df-2176-4739-bb66-6f61bf7133af/image.png)

useReducer의 사용성을 알아보기 위해 각각에 1부터 10000까지의 수를 더할 수 있는 카운트를 생성했다.

이런식으로 각각 분리해서 작성을 하면 컴포넌트의 길이가 길어지고 복잡해질 수 밖에 없게 된다.

![](https://velog.velcdn.com/images/ninto_2/post/d567917b-63b5-4696-806b-b09c155a8827/image.png)

이런 상황에서 useReducer의 기능을 이용하면, 왼쪽에 보이는 reducer라는 함수를 컴포넌트 외부로 분리해서 다양한 상태변화 로직을 컴포넌트 외부로 분리해서 switch case문법처럼 쉽게 바꿀 수 있게된다.

useReducer는 useState를 대체할 수 있는 훌륭한 기능이다.
useState를 사용하듯이 배열을 반환하게 되고, 사용할때는 비구조화할당을 통해 사용할 수 있다.

첫번째로 반환받게되는 0번째 인덱스는 state이다. 1번째 인덱스는 상태를 변화시키는 action을 발생시키는 함수이다.(dispatch)

useReducer함수를 호출할때, reducer라는 함수를 꼭 전달해주어야 한다.
이 reducer는 dispatch가 상태변화를 일으킬때, 일어난 상태변화를 처리해주는 역할을 수행한다.

그 다음에 useReducer함수에 두번째로 전달하는 인자는 count라는 state의 초기값이 되게 된다.

이 dispatch함수를 호출하면서 객체를 전달한다.
객체에는 꼭 type이라는 프로퍼티가 들어있게 되는데, 이 객체가 바로 Action객체이다.

Action은 곧 상태변화라고 생각할 수 있다. (즉, 상태변화를 설명할 객체)

이 dispatch가 호출될 때 상태변화가 일어나야 하고 이때 전달되는 Action객체는 reducer로 날아가게 된다.

이 reducer함수는 이 dispatch가 호출될 때 처리를 하기 위해서 호출되게 되는데 첫번째 인자로는 state(현재 가장 최신의 state)를 두번째 인자로는 action(dispatch를 호출할때 전달해줬던 action 객체)을 전달받는다.

![](https://velog.velcdn.com/images/ninto_2/post/3e654d9d-dec0-40b7-a9e2-f90e44b7a156/image.png)

이런식으로 reducer함수는 action의 type에 따라서 각각 다른 값을 반환하고 있다.
(이 반환되는 값은 새로운 state가 된다)

<br>

### Context API 생성하기

```js
// Context 생성

const MyContext = React.createContext(defaultValue);

// Context Provider를 통한 데이터 공급

<MyContext.Provider value={전역으로 전달하고자 하는 값}>
  {/*이 Context안에 위치할 자식 컴포넌트들*/}
<MyContext.Provider />
```

props로 받는 value라는 값을 이 안에 있는 자식 컴포넌트들에게 전달하는 방식이다.
값을 전달받을 수 있는 자식 컴포넌트의 수는 제한이 없다.
Provider의 자식으로 존재하기만 하면 모든 컴포넌트는 전달하는 값을 사용할 수 있다.
