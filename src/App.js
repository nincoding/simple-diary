import './App.css';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
//import dummyData from './data/dummyDate';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
//import LifeCycle from './components/LifeCycle';
//import OptimizeTest from './components/OptimizeTest';

/**
 * 
 * @returns 오늘의 일기 입력폼, 일기 리스트 출력폼
 * DiaryList 컴포넌트에 dummyData를 props로 전달해준다.
 * dummyData대신에 diaryList에 일단 빈배열을 전달해준다.
 * 전역적으로 가장 위인 App에서 데이터를 관리할 state를 만들어준다.
 * diaryList에 초기설정한 state인 data를 props로 전달한다.
 * 전역으로 사용하는 함수명 하나를 바꾸기 위해선 사용하고 있는 컴포넌트들에 가서 똑같이 수정해줘야한다. (onDelete -> onCreate)
 * 이렇게 이름을 수정하는 방법은 다른 방법이 있지만, 지금은 불편하게 하나하나 수정해야하는 느낌을 기억해놓자.
 * 
 * 수정하기 기능을 추가하기 위해선, 먼저 각각의 아이템들이 수정하기 버튼을 포함하고 있고, 그 버튼을 클릭했을때 내용을 수정할 수 있는 입력폼이 나와야한다.
 * 수정완료 버튼을 눌렀을때 변경된 데이터를 data content에 넣어주기 위해서 이벤트핸들러함수를 하나 만들어주자.
 * 
 * API 호출을 하기 위해 해당 API의 URL주소와 함께 호출할 함수를 만들어준다.
 * 
 * 메모이제이션이 필요한 상황을 만들어보자.
 * 일기장 프로젝트에는 감정점수를 기록할 수 있는 기능이 있다.
 * 오늘의 상황을 위해 3 미만인 1과 2는 감정이 좋지않음을 3,4,5는 감정이 좋음을 나타낸다고 설정해보자.
 * App컴포넌트에 지금 현재 기분이 좋은 일기가 몇개있는지 카운트해보고, 기분이 안좋은 일기는 몇개있는지, 기분이 좋은일기의 비율은 어떻게 되는지를 구현한다.
 * 감정점수 분석함수는 일기를 수정할땐 굳이 사용될 필요가 없다. 감정점수는 그대로이기 때문이다.
 * 이때 메모이제이션기법을 사용해볼 수 있다. return을 가지고 있는 함수를 메모이제이션을 해서 최적화하기 위해선 useMemo를 사용하면된다.
 * 이런식으로 데이터의 길이가 변하지 않는다면 불필요한 렌더링없이 최적화를 할 수 있게 된다.
 * 
 * React.memo를 이용해서 재사용 컴포넌트사용으로 렌더링 최적화를 구현해보자.
 * OptimizeTest 컴포넌트를 만들어서 App에서 import해준다.
 */

// comment API를 사용하기 위한 URL
// https://jsonplaceholder.typicode.com/comments

function App() {

  // 이 상태는 일기데이터를 배열로 저장할 것이기 때문에 배열로 초기값을 설정한다.
  const [ data, setData ] = useState([]);

  // 처음에는 0번 인덱스부터 시작하도록 설정해준다.
  // dataId.current는 어떤 DOM도 선택하지않고 그냥 0이라는 값을 가리키게 되어있다.
  const dataId = useRef(0);

  // API를 호출하기 위한 함수
  // 자바스크립트의 내장함수인 fetch를 await 키워드와 함께 사용할 것이기 때문에 함수를 async로 만든다.
  // 이 getData함수가 promise를 반환하는 비동기함수로 만들어준다.
  // App컴포넌트가 Mount되자마자 호출을 해보자.
  const getData = async () => {
    // 이 res 응답객체안에는 fetch안에 API의 URL을 넣어준다.
    // fetch의 결과값을 then으로 res안에 넣어준다. 넣어줄땐 json을 통해서 json값들만 뽑아온다.
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());
    
    //console.log(res);
    // 응답받아온 500개의 객체배열에서 너무 많으니까 20개만 쓰도록 하자.
    // 이 배열에서 map을 사용해서 새로운 배열을 만들어서 initData에 넣어준다.
    // 감정점수는 랜덤으로 1부터 5까지 설정해준다.
    // Math.random() * 5는 0부터 4까지의 랜덤 난수를 생성한다.(소수점자리가 나올수있음) 그 다음 Math.floor를 해줘서 정수로 바꿔준다.
    // 0부터 4까지 랜덤으로 나오게 되므로 + 1 을 해줘서 1부터 5까지 랜덤으로 정할 수 있도록 만들었다.
    // 생성시점은 현재 시간을 기준으로 ms로 받아준다.
    // id는 dataId에 current값으로 한다음 1을 증가시켰는데 바로 리턴되기때문에 후위연산자를 사용해준다.
    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id : dataId.current++,
      }
    }) 
    
    // 위처럼 생성한 데이터를 setData를 통해 data의 상태값으로 넣어주게되면 API로 받아온 데이터를 렌더할 수 있게된다.
    setData(initData);
  }

  // 두번째 인자에 빈배열을 설정하면 Mount되는 시점에 콜백이 실행된다.
  // 콘솔에 호출한 500개를 받아온걸 확인할 수 있다.
  // 이 호출해서 받아온 결과값을 일기데이터의 기초 초기값으로 사용해보자.
  // body는 일기데이터의 본문으로, email은 작성자로 사용해보자.
  useEffect(() => {
    getData();
  }, []);

  // data 상태에 새로운 일기를 추가하는 함수를 만들어준다.
  // 이 일기데이터를 추가할 수 있는 함수를 DiaryEditor에 props로 전달해준다.
  // 해당 작성데이터는 아직 상태를 모르기때문에 필요한 파라미터를 받아준다.
  // 새로운 아이템을 만들기위해 id가 필요한데 useRef를 사용해서 만들어준다.

  // 여기에 useMemo를 사용하면 안된다. 그 이유는 함수가 아닌 값을 반환하기 때문이다.
  // 우리가 원하는건 onCreate를 원본그대로 DiaryEditor에 보내주는 것이다.
  // 여기서 useCallback을 사용할 수 있다. - onCreate가 다시 생성되지 않게 만들기
  // 두번째 인자로는 빈배열을 전달해서 Mount되는 시점에 한번만 만들고 그 다음부터는 첫번째 만들었던 함수를 그대로 재사용할 수 있도록 구현함
  // 빈배열로 전달해줬더니 일기를 추가했을때 기존에 있던 일기가 다 없어지고 새롭게 생성한 일기만 남게되었다.
  // 이런 상황에서는 함수형 업데이트를 사용하면 된다.
  // setData 상태변화함수에 값을 전달하고 그 값이 새로운 state의 값이 되는데 여기에 함수를 전달해도된다.
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }

    // 다음 일기 아이템은 다시 렌더링되서 만들어질때 + 1을 해줄 수 있도록 더해준다.
    dataId.current += 1;

    // 원래 배열에 들어있던 data를 스프레드로 사용해서 나열하고, 새로운 아이템을 추가해준다.
    //setData([...data, newItem]) 그런데 새로운 아이템을 맨 위로 올리고 싶으므로 순서를 바꾼다.
    //setData([newItem, ...data]);

    // 이런식으로 상태변화함수에 함수를 전달하는 것을 함수형 업데이트라고 한다.
    // 이렇게 되면 디펜던시 array를 빈배열로 넣어줘도 setData에서 data를 인자를 통해 참조할 수 있게되면서 뎁스를 비울수있도록 도와준다.
    setData((data) => [newItem, ...data]);
  }, []);

  // Delete기능 구현을 위한 함수 - DiaryItem에서 delete버튼 클릭시 App의 data state가 뺀 값으로 변경되어야한다.
  // 어떤 Id를 가지고 있는지 App에서는 모르기때문에 전달을 받아준다.
  // DiaryItem에서 이 onDelete함수를 호출할 수 있어야한다. 즉, DiaryItem에 이 함수를 props로 전달해줘야 하는데 DiaryItem의 부모인 DiaryList에 전달해준다.

  // Delete는 취소인데, remove라고 해야 삭제하기로 뜻이 더 직관적일 것 같아서 함수명을 바꿔준다.
  const onRemove = (targetId) => {
    // targetId를 제외한 새로운 배열을 만들어줘서 setData함수에 전달해줘서 data 배열을 바꿔줘야한다.
    //console.log(`${targetId}가 삭제되었습니다.`);
    // 원래 data 리스트에서 filter를 해준다.
    // 해당 아이디를 제외한 새로운 배열만 남게된다.
    const newDiaryList = data.filter((it) => it.id !== targetId);
    //console.log(newDiaryList);
    // 이렇게 만들어진 새로운 일기리스트를 setData에 전달해주면 삭제가 완료된다.
    setData(newDiaryList);
  }

  // prop으로 전달되어서 DiaryItem에서 사용될 함수이다. 매개변수로 무엇을 어떻게 수정할지를 받아와야한다.
  // 어떤 아이디를 가진, 어떻게 content를 변경할 건지 두 개의 매개변수를 사용해준다. (수정대상 아이디와 수정한 콘텐츠의 내용)
  // 결론적으로 이 onEdit함수는 DiaryItem의 수정완료버튼을 클릭했을때 호출되어야 한다. (먼저 DiaryItem의 부모인 DiaryList로 넣어준다.)
  const onEdit = (targetId, newContent) => {
    // data에 map을 돌려서 각각 모든 요소들이 targetId와 일치하는지 검사한다. (일치하는 아이디를 갖는 원소는 딱 하나밖에 없다.)
    // 아이디가 일치하게 되면 해당 원소는 수정대상이 되는 원소가 된다.
    // 일치하는 경우 content프로퍼티의 값을 newContent의 값으로 업데이트 시켜주면 된다.
    // 아이디가 일치하지 않으면 수정대상이 아니기 때문에 it을 반환하게 하면 수정이 되게 된다.
    setData(
      data.map((it) => it.id === targetId ? { ...it, content: newContent,} : it )
    );
  }

  // 감정의 기분을 구분할 수 있는 함수를 만든다. 데이터 분석이라는 함수

  // 이 기억해놓고 싶은 함수를 useMemo로 감싸주면 된다.
  // 그러면 useMemo안에 콜백함수로 기능을 실행하는 모습이 된다.
  // 두번째인자로 배열을 전달해야는는데 이 배열은 의존성배열과 같다.
  // 이 배열안에 data.length를 넣어놓게 되면 data.length가 변화할때만 이 useMemo의 첫번째 콜백함수가 다시 실행되게 된다.
  // 이렇게 useMemo로 감싸서 사용하게 되면 getDiaryAnalysis는 더이상 함수가 아니게된다.
  // 그이유는 getDiaryAnalysis가 리턴하는 값을 리턴하게 된다. (값을 리턴)

  // 정리하자면, 함수가 어떤 값을 리턴하고 있는데 그 리턴까지의 연산을 최적화하고 싶다면 디펜던시 array에 어떤 값이 변경될때만 수행하도록 명시해준다면 이 함수를 값처럼 사용해서 연산최적화를 할 수 있다.
  const getDiaryAnalysis = useMemo(() => {
    // 새로고침을 눌러보면 일기분석함수가 2번 동작하는것을 확인할 수 있다.
    // 처음 App이 Mount될때 data값으로 빈배열을 가질때 그 순간 getDiaryAnalysis를 한번 호출하게된다. 0 0 0 NaN
    // 그 다음 data값이 바뀌게 될때 즉, 리렌더될때 getDiaryAnalysis 다시 호출하게 되고, 값이 바뀐다.

    //console.log('일기분석 시작');

    // 기분이 좋은 일기가 몇 개있는지 세는 상수를 만든다.
    // data에 filter를 이용해서 emotion이 3이상인 것들의 배열의 길이를 구하면된다.
    const goodCount = data.filter((it) => it.emotion >= 3).length;

    // 기분이 나쁜 일기는 일기의 전체 개수에서 좋은일기의 개수를 빼주면된다.
    const badCount = data.length - goodCount;

    // 좋은 일기의 비율을 구하는건 좋은일기의 개수에서 전체 일기의 개수 나눈다음 100을 곱해주면된다.
    const goodRatio = Math.round((goodCount / data.length) * 100);

    // 위 3개의 데이터를 객체로 반환해준다.
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  // 이렇게 만든 지역함수인 getDiaryAnalysis를 App컴포넌트에서 return전에 호출해준다.
  // 이 함수를 호출한 결과값을 객체로 반환해주므로, 비구조화할당으로 받아온다.
  // App컴포넌트가 렌더될때마다 getDiaryAnalysis를 호출해주는 이 부분 역시 다시 호출된다.
  //const { goodCount, badCount, goodRatio } = getDiaryAnalysis();
  // useMemo를 사용했다면 이런식으로 값으로 사용해야 한다.
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  // LifeCycle 실험을 위해 가장위해 LifeCycle 컴포넌트를 렌더해준다.
  return (
    <div className="App">
      {/*<LifeCycle />*/}
      {/*<OptimizeTest />*/}
      <DiaryEditor onCreate={onCreate}/>
      <div>전체일기 : {data.length} </div>
      <div>기분 좋은 일기 개수: {goodCount} </div>
      <div>기분 나쁜 일기 개수: {badCount} </div>
      <div>기분 좋은 일기 비율 : {goodRatio} </div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

export default App;
