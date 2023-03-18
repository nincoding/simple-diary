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
 * 전역으로 사용하는 함수명 하나를 바꾸기 위해선 사용하고 있는 컴포넌트들에 가서 똑같이 수정해줘야한다. (onDelete -> onCreate)
 * 이렇게 이름을 수정하는 방법은 다른 방법이 있지만, 지금은 불편하게 하나하나 수정해야하는 느낌을 기억해놓자.
 * 
 * 수정하기 기능을 추가하기 위해선, 먼저 각각의 아이템들이 수정하기 버튼을 포함하고 있고, 그 버튼을 클릭했을때 내용을 수정할 수 있는 입력폼이 나와야한다.
 * 수정완료 버튼을 눌렀을때 변경된 데이터를 data content에 넣어주기 위해서 이벤트핸들러함수를 하나 만들어주자.
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

  // Delete는 취소인데, remove라고 해야 삭제하기로 뜻이 더 직관적일 것 같아서 함수명을 바꿔준다.
  const onRemove = (targetId) => {
    // targetId를 제외한 새로운 배열을 만들어줘서 setData함수에 전달해줘서 data 배열을 바꿔줘야한다.
    console.log(`${targetId}가 삭제되었습니다.`);
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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

export default App;
