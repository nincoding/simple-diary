/**
 * 함수형 컴포넌트의 LifeCycle을 실험하기 위한 컴포넌트
 * useEffect의 사용법을 배워보자.
 * 먼저 사용할 useEffect를 React에서 import 받아온다.
 * 실험을 위해 간단한 카운터랑 input을 넣어준다.
 * 
 * 첫번째로 컴포넌트가 탄생할때 즉, Mount되는 시점을 제어해보자.
 * 컴포넌트의 Mount되는 시점에만 실행하고 싶다면 useEffect의 두번째 인자에 빈배열을 전달한 뒤에 
 * 콜백함수에 수행하고 싶은 일을 넣어주면 된다.
 * 
 * 두번째로 컴포넌트가 업데이트되는 시점을 제어해보자.
 * 컴포넌트는 부모에게 전달받는 prop가 변경되거나, state가 변경될때, 혹은 부모컴포넌트가 리렌더링될때 업데이트된다.
 * state가 바뀌는 순간을 useEffect로 제어해보자.
 * 컴포넌트가 업데이트 되는 순간에 제어를 하고싶다면 두번째 인자를 전달하지않고, 콜백함수내에서 실행하면된다.
 * 혹은 의존성배열을 통해 업데이트되는 주체를 설정해서 렌더를 제어할 수 있다.
 * 
 * 마지막으로 UnMount 시점을 제어해보자.
 * useEffect에서 첫번째로 오는 콜백함수안에 return 콜백함수를 해주면 이 리턴되는 함수안에서 제어할 수 있다.
 * 이 useEffect를 사용하면 다양한 상황에서 LifeCycle를 이용해서 컴포넌트 제어를 할 수 있게된다.
 */


import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 20px;
`;

const LifeCycle = () => {

  /*
  // 0부터 시작하는 간단한 카운트의 상태값을 만들어준다.
  const [ count, setCount ] = useState(0);

  // input에 사용될 상태값을 만들어준다.
  const [ text, setText ] = useState('');

  // useEffect 함수를 호출해준다. 첫번째인자는 콜백함수를 두번째 인자는 의존성배열을 넣어준다.
  useEffect(() => {
    // Mount 되는 시점이기 때문에 콘솔에 출력해준다.
    // 의존성배열에 빈배열을 넣어주게되면, 이 콜백함수는 컴포넌트가 Mount된 시점에만 작동하게 되기 때문에
    // 버튼을 아무리 눌러서 렌더링해주어도 한번만 실행되는 것을 확인할 수 있다.
    console.log('Mount!');
  }, [])

  // 업데이트되는 순간의 제어 - 두번째 인자인 의존성배열을 전달하지 않으면 된다.
  useEffect(() => {
    console.log('Update!');
  })

  // 의존성배열의 값이 변화하게 되면 콜백함수가 실행되게 된다.
  // 이 콜백함수는 count state가 변화하는 순간 다시 호출되게 된다.
  useEffect(() => {
    console.log(`count is update! ${count}`);
    // 카운트가 5가 넘어가면 alert과 초기화를 수행해보자.
    // 카운트가 변경되는 시점안에서 예외처리를 실행하게되면 해당 업데이트 상황에서만 제어가 가능해진다.
    if (count > 5) {
      alert('count가 5를 넘었습니다. 따라서 1로 초기화합니다.');
      setCount(1);
    }
  }, [count])

  // 다른 상태값도 마찬가지이다. 상태값이 변화할때 useEffect의 첫번째 콜백함수가 실행된다.
  // 즉, 업데이트 되는 시점에서 의존성배열을 통해 주체를 설정해서 콜백함수를 제어할 수 있다.
  useEffect(() => {
    console.log(`text is update! ${text}`);
  }, [text])
  */

  // unMount의 연습을 하기 위해 기존에 만들어놨던 state와 useEffect를 초기화해주자.
  // 불리언값은 상태값을 하나 만들어주고, 불리언 상태를 핸들링할 함수를 만들어준다.
  const [ isVisible, setIsVisible ] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <Wrap>
      {/*
      <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      */}

      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnMountTest/>}
    </Wrap>
  )
}

// unMount연습을 위해 자식컴포넌트 하나를 만들어준다.
// UnMountTest 컴포넌트는 isVisible이 true일때만 나타날 수 있게 단락회로평가를 이용해 나타낸다.
//  {isVisible && <UnMountTest/>}이런식으로 쓰게되면 isVisible값이 true가 되면 단락회로평가를 못한다. 즉 뒤에 것도 봐야하는데
// 뒤의 값이 true이면 둘다 true이므로 뒤에 값인 <UnMountTest/>이 화면에 보여진다.
// 만약 isVisible이 false라면  &&에서 단락회로평가가 일어나게되서 <UnMountTest/>도 렌더링이 안되게 된다.
const UnMountTest = () => {

  // 이 상황에서 UnMountTest에서 useEffect를 적용해서 컴포넌트가 UnMount되는 순간을 제어해준다.
  useEffect(() => {
    // 첫번째인자에 콜백함수를 두번째인자에 빈배열을 넣으면 Mount되는 순간을 제어하게된다.
    console.log('Mount!');

    // UnMount는 이 첫번째인자인 콜백함수가 함수를 하나 리턴하게 하면 된다.
    // 이 리턴되는 콜백함수는 unMount되는 시점에 실행되게 된다.
    return () => {
      console.log('UnMount 되는 시점!');
    }
  }, []);

  return (
    <div>
      UnMountTesting Component
    </div>
  )
}

export default LifeCycle;