/**
 * DiaryEditor 컴포넌트가 필요한 것들
 * @returns 작성자, 일기본문, 감정 점수
 * input에 작성된 값을 핸들링 할 수 있도록 만들어야 한다.
 * 사용자의 입력값을 처리하기 위해서 state를 이용할 수 있다.
 * 입력값이 바뀔때마다 실시간으로 상태변화함수를 이용해서 해당state에 입력값을 저장해준다.
 * 이럴때는 onChange라는 이벤트를 사용한다. 이때 콜백함수를 전달해준다. 이 onChange는 값이 바뀌었을때 수행하는 이벤트이다.
 * 이 콜백함수는 event 객체인 e라는 녀석을 전달받게 된다. 사용자가 이벤트를 했을때마다 이 콜백함수가 실행된다.
 * 이 event 객체의 target의 value라는 녀석을 이용하면 값을 바꿀 수 있다.
 * input에 name 속성이 있다면 event.target.name으로 타겟의 이름까지 출력할 수도 있다.
 * 한줄로 입력받을 수 있는 input 대신 여러줄을 입력받을땐 textarea를 사용한다.
 * textarea의 속성도 input과 비슷하다.
 * 똑같이 value에 state의 이름을 넣어주면되고, onChange에서 e.target.value를 해당 state의 상태변화함수에 전달해주면된다.
 * 게다가 두 값이 가지는 자료형인 문자열까지 똑같다.
 * 따라서 두개를 하나의 state로 묶어도 된다.
 * state는 합쳐줬는데 이벤트핸들러가 2개로 나뉘어져 있으니 이상하다.
 * 이 이벤트핸들러를 따로 이벤트함수로 만들어서 합쳐줄 수 있다.
 * 나의 감정을 점수로 표현할 수 있는 select 태그를 만들어보자. select 태그 자식에는 option value로 선택지를 설정할 수 있다.
 * 이 감정을 상태로 저장해야하기 때문에 emotion 프로퍼티를 상태객체에 추가해준다.
 * select태그도 input과 textarea와 같이 onChange의 e.target.value로 값이 바뀐다.
 * 마지막으로 저장버튼 하나까지 만들어보자.
 * 
 * 추가할 기능은 일기 저장하기 버튼을 눌렀을때 입력폼이 예외상황인지 아닌지 판별해야한다.
 * 따라서 handleSubmit에 기능을 추가해준다.
 * focus기능을 사용하기 위해선 DOM 요소를 선택할 수 있어야한다.
 * 리액트에선 useRef를 사용해서 DOM요소를 선택할 수 있다.
 * focus를 사용해야하는 요소는 2개가 있다. input과 textarea
 * 
 * Create 기능구현을 위해 App에서 props로 onCreate라는 상태변화함수를 전달받는다.
 * handleSubmit이라는 이벤트핸들러 함수가 실행될때 상태를 저장했으므로 이 함수를 다시 수정해준다.
 * 
 * 최적화 수정하기 - 컴포넌트가 업데이트되는 상황은 부모컴포넌트가 리렌더되거나 자신이 변경되거나 자신이 받은 prop이 변경되는 경우이다.
 * 이 DiaryEditor컴포넌트는 onCreate라는 일기저장하기 버튼을 눌렀을때 일기를 생성하는 함수하나만 전달받고 있다.
 * React.memo를 이용해서 컴포넌트를 최적화해보자. 하지만 컴포넌트의 코드가 80라인 이상이나 존재하고 있다.
 * 굉장히 내려가기 까다롭기때문에 컴포넌트에 직접치지말고 맨 아래 exprot 문에 묶어주면된다.
 */

import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import DiaryDispatchContext from '../context/DiaryDispatchContext';

// 강의에서는 .DiaryEditor 로 css파일에서 스타일링했지만 스타일드 컴포넌트 연습겸 활용해보기
// 테두리에 1px 직선 그레이선 추가
// 요소들을 가운데 정렬

const DiaryEditorWrap = styled.div`
  border: 1px solid gray;
  text-align: center;
  padding: 20px;
`;

const AuthorInput = styled.input`
  margin-bottom: 20px;
  width: 500px;
  padding: 10px;
`;

const ContentTextarea = styled.textarea`
  margin-bottom: 20px;
  width: 500px;
  padding: 10px;
  height: 150px;
`;

const EmotionSelect = styled.select`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
`;

// cursor: pointer는 마우스를 호버했을때 손가락 모양이 나오도록 보이게한다.
const SubmitButton = styled.button`
  width: 500px;
  padding: 10px;
  cursor: pointer;
`;

// App에서 만들어준 상태변화함수인 onCreate함수를 전달받는다.
//const DiaryEditor = ({onCreate}) => {
  const DiaryEditor = () => {

    // App에서 onCreate를 전달받지 않으므로 context에서 가져온다.
    // DiaryDispatchContext에서 받고있는 함수는 3개이기 때문에 비구조할당으로 가져와야된다.
    const { onCreate } = useContext(DiaryDispatchContext);

// useEffect를 활용해서 언제 렌더링이 일어나는지 콘솔을 이용해서 확인해보자.
  // 렌더가 2번이나 발생했다. 그이유는 App컴포넌트를 확인하면 답을 찾을 수 있다.
  // data의 초기값이 빈배열인 상태에서 한번 렌더가 일어난다.
  // 그 다음 컴포넌트가 Mount된 시점에 호출한 결과를 setData에 전달하면서 data state가 바뀌게되면서 렌더된다.
  // 즉, DiaryEditor가 전달받는 onCreate함수도 App컴포넌트가 2번 렌더링되면서 다시 생성되게 되는것이다.
  // onCreate안에 있는 데이터는 같은 값이긴 하지만 비원시타입의 자료는 React.memo에서 기본적으로 얕은비교로 일어나기때문에
  // prop으로 전달받고 있는 onCreate가 App컴포넌트가 렌더링이 될때마다 계속 다시 만들어져서 계속 렌더링이 발생하고 있는 것이다.
  // 결론적으로 {onCreate}이 함수가 재생성되지 않아야만 DiaryEditor컴포넌트를 React.memo와 함께 최적화할 수 있다.
  // App컴포넌트에서 onCreate함수가 다시 생성되지 않게 만들어주자.
  /*
  최적화가 끝났기때문에 콘솔은 지워준다.
  useEffect(() => {
    console.log(`DiaryEditor 렌더`)
  })
  */

  // 작성자로부터 state를 받는다. 초기값에는 입력을 안한 상태이니까 공백 문자열을 넣어준다.
  // input의 value로 해당 state를 props로 전달한다. 그럼 아무리 입력해도 input의 값이 바뀌지 않는다.
  // 그 이유는 상태변화함수인 setAuthor가 수행되지 않기 때문이다. 상태변화함수가 아니면 절대로 상태를 변화시킬 수 없다.
  //const [ author, setAuthor ] = useState("");
  //const [ content, setContent ] = useState("");

  // input과 textarea의 state를 하나의 state로 관리를 하는데 기본값으로 객체로 만들어준다.
  // value에는 각각 state.author, state.content를 넣어준다.
  // onChage에는 간단하게 생각해서 author부분은 e.target.value으로 바꿔주고, content는 기본값인  state.content로 설정해준다.
  // content부분에서도 반대 개념으로 생각하면 쉽다.
  // 객체의 값을 바꾸려면 항상 새로운 객체를 만들어서 전달 해줘야한다.

  const [ state, setState ] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  //focus를 주기위해 useRef를 사용한다. 이런식으로 useRef함수를 호출해서 어떤 반환값을 authorInput 상수에 담아준다.
  // 그러면 이 상수는 HTML DOM요소를 접근할 수 있는 기능을 제공한다.
  // 해당 입력폼으로 가서 ref={authorInput} 이런식으로 접근할 수 있도록 설정한다.
  const authorInput = useRef();
  const contentInput = useRef();

  // 핸들러함수가 event 객체를 받도록 만든다. 이 함수가 input과 textarea의 onChange에 들어간다.
  // 여기에 저장되는 e.target.name는 실제로 바꿔야하는 프로퍼티 key와 같다. input입력하면 author가 textarea입력하면 content가 나옴
  // 따라서 이 핸들러함수안에서 상태변경함수를 실행해서 원래 state를 펼쳐준다.
  // 괄호 표기법으로 각각의 key와 value값을 상태에 저장시킨다.
  const handleChangeState = (e) => {
    //console.log(e.target.name);
    //console.log(e.target.value);

    setState({
      ...state,
      [e.target.name] : e.target.value,
    })
  }

  // 일기저장하기 버튼을 눌렀을때 이벤트핸들러함수
  const handleSubmit = (e) => {
    // 버튼을 눌렀을때 현재 저장된 상태값을 출력해보자.
    // 현재 실시간 상태에 맞춰서 상태에 저장된 값들이 state객체에 잘 담겨있는것을 확인할 수 있다.
    //console.log(state);
    //alert("저장 성공");

    // 버튼을 눌렀을때 예외 상황인지 아닌지 판별하자.
    // state.author.length가 1미만이라면 한 글자도 입력하지 않았다는 뜻이다.
    // 예외상황에서 alert을 띄워버리는건 좋은 UX가 아니다.
    // 보통 트랜디한 웹사이트는 alert보단 focus를 사용한다.
    // focus를 주기위해선 어떤 DOM element에 focus를 줘야하는지 자바스크립트 코드가 알고있어야한다.
    // 이렇게 DOM 요소를 선택할 수 있는 기능을 리액트는 제공한다.
    if (state.author.length < 1) {
      //alert("작성자는 최소 1글자 이상 입력해주세요.");
      // 이부분에 focus를 줘야한다.
      // 이런 useRef는 현재 가리키는 값을 current라는 것으로 사용할 수 있게 된다.
      authorInput.current.focus();
      return;
    }

    // 일기본문의 길이가 5글자 미만이라면 예외상황
    if (state.content.length < 5) {
      //alert("일기 본문은 최소 5글자 이상 입력해주세요.");
      // 이부분에 focus를 줘야한다.
      contentInput.current.focus();
      return;
    }

    // 여기에서 props로 전달받은 onCreate를 호출하면된다.
    // 상태변화값에 현재상태의 작성자 내용, 감정점수를 넣어서 저장해준다.
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");

    // 서브밋 버튼을 눌러서 일기데이터 추가에 성공해서 출력까지 했지만 입력폼 데이터는 그대로 남아있다.
    // 일기를 성공적으로 저장했다면 입력폼 상태를 초기화시켜준다.
    setState({
      author: "",
      content: "",
      emotion: 1,
    })
  }

  return (
    <DiaryEditorWrap>
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>

        <AuthorInput
          ref={authorInput}
          name='author'
          value={state.author} 
          onChange={
            handleChangeState
          //setAuthor(e.target.value);
          // 하지만 객체가 10개 이상이라면 주렁주렁 달아줘야하는 문제가 생긴다. 이럴때는 스프레드를 사용하자.
          /*
          setState({
            author: e.target.value,
            content: state.content,
          })
          이 스프레드가 state가 가지고 있는 프로퍼티들을 펼쳐준다. 원래 프로퍼티들의 값으로 미리 펼쳐주기 때문에
          다 적지않아도 기본적으로 대체할당할 수 있다.
          따라서 하나의 state로 각각의 입력폼에서 state를 저장할 수 있다.
          하지만 이 스프레드와 바뀌는 프로퍼티의 순서를 바꾸게되면 업데이트가 안된다.
          그 이유는 새로운 값으로 사용될 객체가 만들어질때 위에서 아래의 순으로 코드가 실행되기 때문이다.
          반드시 원래있는 state를 먼저 펼쳐주고나서, 변경하고자하는 프로퍼티를 마지막에 적어주자.
          */
         /*
         //onChange에 상태변경함수를 직접 넣기보단 이벤트핸들러 함수를 전달한다.
         //콜백으로 받았던 event객체를 콜백함수로 만든 이벤트핸들러 이름으로 대신 넣어준다.
          setState({
            ...state,
            author: e.target.value,
          })
          */
        }
        />
      </div>
      <div>
        <ContentTextarea
          ref={contentInput}
          name='content'
          value={state.content} 
          onChange={
          //setContent(e.target.value);
          /*
          setState({
            author: state.author,
            content: e.target.value,
          })
          */
         /*
          setState({
            ...state,
            content: e.target.value,
          })
          */
          handleChangeState
        }/>
      </div>
      <div>
        오늘의 감정점수:
        <EmotionSelect
          name='emotion'
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        
        </EmotionSelect>
      </div>
      <div>
        <SubmitButton onClick={handleSubmit}>일기 저장하기</SubmitButton>
      </div>
    </div>
    </DiaryEditorWrap>
  )
}

export default React.memo(DiaryEditor);