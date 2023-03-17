import './App.css';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
//import dummyData from './data/dummyDate';
import { useState, useRef } from 'react';

/**
 * 
 * @returns 오늘의 일기 입력폼, 일기 리스트 출력폼
 * DiaryList 컴포넌트에 dummyData를 props로 전달해준다.
 * dummyData대신에 diaryList에 일단 빈배열을 전달해준다.
 * 전역적으로 가장 위인 App에서 데이터를 관리할 state를 만들어준다.
 * diaryList에 초기설정한 state인 data를 props로 전달한다.
 */

function App() {

  // 이 상태는 일기데이터를 배열로 저장할 것이기 때문에 배열로 초기값을 설정한다.
  const [ data, setData ] = useState([]);

  // 처음에는 0번 인덱스부터 시작하도록 설정해준다.
  // dataId.current는 어떤 DOM도 선택하지않고 그냥 0이라는 값을 가리키게 되어있다.
  const dataId = useRef(0);

  // data 상태에 새로운 일기를 추가하는 함수를 만들어준다.
  // 이 일기데이터를 추가할 수 있는 함수를 DiaryEditor에 props로 전달해준다.
  // 해당 작성데이터는 아직 상태를 모르기때문에 필요한 파라미터를 받아준다.
  // 새로운 아이템을 만들기위해 id가 필요한데 useRef를 사용해서 만들어준다.
  const onCreate = (author, content, emotion) => {
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
    setData([newItem, ...data]);
  }

  // Delete기능 구현을 위한 함수 - DiaryItem에서 delete버튼 클릭시 App의 data state가 뺀 값으로 변경되어야한다.
  // 어떤 Id를 가지고 있는지 App에서는 모르기때문에 전달을 받아준다.
  // DiaryItem에서 이 onDelete함수를 호출할 수 있어야한다. 즉, DiaryItem에 이 함수를 props로 전달해줘야 하는데 DiaryItem의 부모인 DiaryList에 전달해준다.

  const onDelete = (targetId) => {
    // targetId를 제외한 새로운 배열을 만들어줘서 setData함수에 전달해줘서 data 배열을 바꿔줘야한다.
    console.log(`${targetId}가 삭제되었습니다.`);
    // 원래 data 리스트에서 filter를 해준다.
    // 해당 아이디를 제외한 새로운 배열만 남게된다.
    const newDiaryList = data.filter((it) => it.id !== targetId);
    //console.log(newDiaryList);
    // 이렇게 만들어진 새로운 일기리스트를 setData에 전달해주면 삭제가 완료된다.
    setData(newDiaryList);
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onDelete={onDelete}/>
    </div>
  );
}

export default App;
