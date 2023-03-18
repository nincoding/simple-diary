/**
 * 전달된 props를 형식에 맞게 다 받아와준다. (사용했던 객체 프로퍼티 키들 { author, content, created_date, emotion, id })
 * 작성시간을 만들때 더미데이터에서 new Date().getTime()으로 ms 숫자로 받아와줬기때문에
 * 사람이 알아볼 수 있도록 바꿔준다. 이 ms를 new Date(ms)이런식으로 넣어주면 이 시간을 기준으로 Date객체가 생성된다.
 * 이 생성된 Date객체에 toLocalString()메서드를 사용해서 문자형식으로 변경해준다.
 * 
 * Delete의 기능구현을 위해 각각의 item들에 삭제버튼이 달려야한다.
 * Update의 기능구현을 위해 각각의 item들에 수정버튼이 달려야한다.
 * 수정하기 버튼을 누르면, 일기본문 content가 들어나는게 아니라 입력수정폼이 나타나야한다.
 * 그래서 이걸 state로 만들어주자.
 * 수정하기 버튼을 눌러서 수정폼이 활성화되었다면 아래에 나오는 버튼들도 삭제하기,수정하기 버튼이 아니라 다른버튼들로 바뀌게 만든다.
 * 버튼들을 isEdit 상태에 따라 수정중인 상태라면 수정 취소 버튼과 수정 완료 버튼이 있어야한다.
 * 
 * 수정하기를 누르면 원래 가지고있던 content의 상태 텍스트들에서 그대로 수정할 수 있어야한다.
 * 즉, isEdit의 원래 기본초기값 ""이 아니라 원래 content로 바꿔준다.
 * 다음으로는 수정완료하기 버튼을 눌렀을때 기존 content의 상태값이 수정된 값으로 변경되도록 만들어준다.
 * 수정완료하기 버튼이 가지고 있는 데이터를 App컴포넌트에서 상태변화함수를 전달받아서 넣어줘야한다.
 */

import styled from "styled-components";
import { useState, useRef } from "react";

const DiaryItemWrap = styled.div`
  background-color: rgb(240, 240, 240);
  margin-bottom: 10px;
  padding: 20px;
`;

// info 부분과 content 부분을 구분하기 위해서 스타일링으로 구분한다.

const UserInfo = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const CreatedDate = styled.div`
  color: gray;
`;

const DiaryContent = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const EditForm = styled.textarea`
  margin-bottom: 20px;
  width: 500px;
  padding: 10px;
  height: 150px;
`;

// DiaryItem에서는 삭제기능을 위해 onDelete를 props로 또 받아준다.
// 위에서 내려받은 상태변화함수인 onEdit을 받은 다음에 수정완료 버튼을 클릭했을때 실행할 수 있도록 한다.
const DiaryItem = ({ author, content, created_date, emotion, id, onRemove, onEdit }) => {

  // 수정하기 버튼을 눌렀을때 상태를 저장하고 있을 state를 만든다.
  // 이 isEdit의 상태는 기본값으로 false를 넣어준다.
  // 이 상태는 true와 false로 불리언 값을 갖게되고, 현재 수정중인지, 수정중이지않은지 값을 보관해놓는 기능을 한다.
  // 만약 이 값이 true가 되면 수정중으로 간주해서 입력폼을 수정할 수 있는 상태로만들고, 수정중이 아닌 기본값이 false인 상태라면
  // 지금처럼 삭제하기, 수정하기버튼과 저장되있던 content값을 볼 수 있게 하는 역할을 수행한다.
  const [ isEdit, setIsEdit ] = useState(false);

  // 수정폼에 입력된 값의 상태를 저장하기 위한 state를 만든다. (textarea의 input을 핸들링할 state)
  // textarea를 통해 입력한 값을 localContent상태에 맵핑시켜서 사용할 수 있다.
  // 원본데이터에서 수정을 출발할 수 있도록 빈문자열이 아니라 content를 초기값으로 설정한다.
  //const [ localContent, setLocalContent ] = useState("");
  // 이상태에서 수정취소하기 버튼을 누르고 다시 수정하기 버튼을 누르면 수정이 덜 완료된 값이 들어있는 것을 볼 수 있다.
  const [ localContent, setLocalContent ] = useState(content);

  // 수정폼 textarea를 focus하기 위한 useRef (해당 수정폼 textarea에 ref해준다.)
  const localContentInput = useRef();

  // 따라서 이 덜 완료된 수정값을 초기화해줘야한다.
  // 수정상태에서 나갈땐 setIsEdit(false)를 false로 바꿔준다음에 localContent의 값을 다시 content로 바꿔준다.
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  }

  // 수정완료 버튼을 클릭했을때 핸들링할 핸들러함수를 만든다.
  // 이 함수가 실행되면 궁극적으로는 onEdit을 실행하게 한다. 그래야 App컴포넌트에서 data가 수정이된다.
  // onEdit에 넣어주기전에 검사를 해야한다. (content의 본문길이를 무조건 5글자 이상으로 작성하게 만든 예외상황 처리)
  const handleEdit = () => {
    // 일기를 수정할때도 똑같이 5글자 이상일때만 작성할 수 있도록 만들어준다.
    // 이전에 예외상황처리에서 사용했던 focus 기능을 추가해준다. (DOM요소에 focus를 해야했기때문에 useRef를 쓴다.)
    if (localContent.length < 5) {
      // 5글자가 넘지않으면 return이 수행되서 아무일도 일어나지 않게된다.
      // focus 기능을 추가해줘서 길이가 5미만이라면 현재가리키고있는 DOM요소에 current.focus()기능을 설정해준다.
      // 그리고 수정완료를 하기 전에 프롬프트 창이 나와서 다시 한번 체크해주니까 이 기능을 만들어주자. window.confirm()으로 만들어준다.
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      // 수정하겠다고 하면 이때 onEdit함수에 넣어준다.
      onEdit(id, localContent);
     
      // 그리고 완료가 되었다면 수정폼을 다시 닫아줘야 한다.
      //  toggleIsEdit()을 실행해서 setIsEdit의 상태를 false로 다시 변경해준다.
      toggleIsEdit();
    }

    // 이 onEdit에는 target.id와 target.content가 필요하다. (이때 content는 바뀐 content인 localContent가 된다.)
    //onEdit(id, localContent);
  }

  // 불리언값을 저장하는 상태를 만들었다면, toggle 함수를 만들 수 있게된다.
  // 이 함수는 실행이 되면 상태변화함수를 이용해서 isEdit의 값을 true로 바꿔서 렌더링을 다시 시켜주는 역할을 수행한다.
  // 굳이 true값으로 하드코딩할 필요없이 초기 설정된 false값에 !만 붙여서 반대 불리언값으로 바꿔준다.
  // 이렇게 만든 toggle함수를 수정하기 버튼을 클릭하면 작동할 수 있도록 만들어준다.
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  }

  // 삭제하기 버튼이 수행하고 있는 부분을 이벤트핸들러함수를 만들어서 분리해준다.
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      // 확인을 누른경우 onDelete에 현재 해당 id를 전달해준다. App에서 정확히 target.id를 전달받게된다.
      onRemove(id);
    }
  }

  // 수정하기 버튼 클릭시 content부분이 변경되어야 하므로, 삼항연산자를 사용해서 수정중이라면 수정폼으로 아니라면 기본 값인 content를 렌더링하도록 설정한다.
  // 수정폼으로는 textarea를 렌더해주도록 한다.
  // 이 수정폼에 입력하는 데이터들도 리액트에서 핸들링할 수 있도록 만들어준다.
  return (
    <DiaryItemWrap>
    <div className="DiaryItem" key={id}>
      <UserInfo>
        <span>작성자 : {author} | 감정점수 : {emotion}</span>
        <CreatedDate>{new Date(created_date).toLocaleString()}</CreatedDate>
      </UserInfo>
        <DiaryContent>
          {isEdit ? <>
            <EditForm 
              ref={localContentInput}
              value={localContent} 
              onChange={(e) => {
              setLocalContent(e.target.value)
            }}/>
          </> : <>{content}</>}
        </DiaryContent>
    </div>
    {/*
    삭제하기 버튼이 코드가 길어져서 props로 받고있는 부분을 return 부분 밖으로 빼준다. (이벤트핸들러함수 만들기)
    이 onClick이벤트 효과로 이벤트핸들러함수를 넣어준다.
    <button onClick={() => {
      // 일기 데이터를 삭제하기 위해선 해당 데이터의 id값과 일치하는지 확인해야한다. (id에 해당하는 데이터만 삭제하기 위함)
      // 이 삭제하기 버튼이 클릭되었을때 정말 데이터가 삭제되려면 App컴포넌트가 가지고 있는 data state를 바꿔줘야한다.
      // 이 버튼을 누르면 해당 id와 매칭되는 배열을 뺀 배열로 App data state를 업데이트 시켜줘야한다.
      // 즉 App에 delete함수를 만들어준다.

      // props로 전달받은 onDelete함수를 호출한다.
      // item을 삭제하기 전엔 모달이나 alert이 나와서 확인 취소로 물어보니까 구현해준다.
      // window.confirm()은 대화창같은게 떠서 확인 취소로 물어본다.
      console.log(id);
      if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
        // 확인을 누른경우 onDelete에 현재 해당 id를 전달해준다. App에서 정확히 target.id를 전달받게된다.
        onRemove(id);
      }
    }}>삭제하기</button>

    // 수정하기가 true인지 false인지 여부에 따라 렌더링되는 버튼들도 변경해준다.
    // 수정취소하기 버튼을 클릭시에 다시 toggle함수를 실행시켜서 isEdit의 상태를 다시 false로 바꿔준다.
    // handleQuitEdit함수를 통해 수정폼에서 content의값을 변경하고 다시 수정하기로 돌아와도 원래의 content값으로 돌아오게된다.
    */}
    {isEdit ? <>
      <button onClick={handleQuitEdit}>수정 취소</button>
      <button onClick={handleEdit}>수정 완료</button>
    </> : <>
      <button onClick={handleRemove}>삭제하기</button>
      <button onClick={toggleIsEdit}>수정하기</button>
    </> }
    {/*
    <button onClick={handleRemove}>삭제하기</button>
    <button onClick={toggleIsEdit}>수정하기</button>
    */}
    </DiaryItemWrap>
  )
}

export default DiaryItem;