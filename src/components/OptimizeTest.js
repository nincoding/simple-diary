/**
 * React.Memo를 이용한 최적화 테스트를 위한 파일
 * 리렌더링과정에서의 낭비되는 상황을 컴포넌트 재사용을 이용해서 해결해보자.
 * 컴포넌트를 재사용할 수 있는 고차컴포넌트인 React.Memo로 컴포넌트를 감싸준다.
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components"

const Wrap = styled.div`
  padding: 50px;
`;

/*

// OptimizeTest컴포넌트의 자식 컴포넌트 2개를 생성한다.
// 각각 text와 count의 상태값을 전달받는다.
// 이런식으로 React.Memo로 해당 컴포넌트를 감싸주면 자신의 state가 바뀌기전까진 절대로 리렌더링 되지않는다.
// 카운트 컴포넌트만 렌더링일어남
const TextView = React.memo(({ text }) => {
  // useEffect를 사용해서 각각 업데이트 상황에서 콘솔을 찍어보면
  // 하나의 자식 컴포넌트가 업데이트될때 부모와 연결된 자식컴포넌트 모두 콘솔이 출력되는걸 확인할 수 있다.
  // 즉, 낭비 상황이 발생했다.
  useEffect(() => {
    console.log(`Update :: Text : ${text}`);
  })

  return (
    <div>{text}</div>
  )
})

const CountView = React.memo(({ count }) => {

  useEffect(() => {
    console.log(`Update :: Count : ${count}`);
  })

  return (
    <div>{count}</div>
  )
})

*/

// 이 2개의 state를 prop으로 전달받을 자식 컴포넌트를 만들어준다.
// 이 CounterA은 버튼을 클릭했을때 상태변화를 주도하긴 하지만 상태가 바뀌진않는다.
// 값이 1로 그대로이기 때문에 아무것도 출력되지않는다.
const CounterA = React.memo(({count}) => {

  useEffect(() => {
    console.log(`Counter A Update - count : ${count}`)
  })

  return (
    <div>{count}</div>
  )
})

// CounterB는 obj의 count는 그대로이지만 리렌더링 되게된다.
// 그 이유는 prop인 obj가 객체이기 때문이다.
// 자바스크립트에서는 기본적으로 객체를 비교할때 얕은 비교를 하기 때문이다.
// 여기에서 React.memo의 두번째 인자인 areEqual를 사용해서 얕은비교를 하지않도록 구현해보자.
const CounterB = ({obj}) => {

  useEffect(() => {
    console.log(`Counter B Update - count : ${obj.count}`)
  })

  return (
    <div>{obj.count}</div>
  )
}

const areEqual = (prevProps, nextProps) => {
  //return true; // 이전 프롭스와 현재 프롭스가 같다 -> 리렌더링을 일으키지않게된다.
  //return false; // 이전과 현재가 다르다 -> 리렌더링이 일어난다.

  // 여기에서 언제 리렌더가 일어나고 안일어나는지 true와 false로 판단할 수 있게된다.
  //if (prevProps.obj.count === nextProps.obj.count) return true;
  //return false;

  // 이렇게 식으로 리턴해줘도 불리언값이 리턴된다.
  return prevProps.obj.count === nextProps.obj.count;
}

// 첫번째 함수로는 객체를 prop으로 전달받는 CounterB를 두번째인자로는 areEqual를 전달해준다.
// 이 React.memo는 컴포넌트를 반환하는 고차컴포넌트이기 때문에 MemoizedCountB를 렌더할 수 있어야 한다.
const MemoizedCountB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  // 이 OptimizeTest에는 2개의 state를 만들어준다.

  //const [ count, setCount ] = useState(1);
  //const [ text, setText ] = useState("");

  // 이번에는 state의 초기상태값과 똑같은 상황의 state변경이 일어날때의 렌더링 상황을 알아보자.
  const [ count, setCount ] = useState(1);
  const [ obj, setObj ] = useState({
    count : 1,
  })

  return (
    <Wrap>
      {/*
      <div>
        <h2>count</h2>
        <CountView count={count}/>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text}/>
        <input onChange={(e) => setText(e.target.value)} />
      </div>
    */}
    <div>
      <h2>Counter A</h2>
      <CounterA count={count}/>
      <button onClick={() => setCount(count)}>A button</button>
    </div>
    <div>
      <h2>Counter B</h2>
      {/*<CounterB obj={obj}/>*/}
      <MemoizedCountB obj={obj}/>
      <button onClick={() => setObj({
        count: obj.count
      })}>B button</button>
    </div>
    </Wrap>
  )
}

export default OptimizeTest;