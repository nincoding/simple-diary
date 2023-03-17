/**
 * 전달된 props를 형식에 맞게 다 받아와준다. (사용했던 객체 프로퍼티 키들 { author, content, created_date, emotion, id })
 * 작성시간을 만들때 더미데이터에서 new Date().getTime()으로 ms 숫자로 받아와줬기때문에
 * 사람이 알아볼 수 있도록 바꿔준다. 이 ms를 new Date(ms)이런식으로 넣어주면 이 시간을 기준으로 Date객체가 생성된다.
 * 이 생성된 Date객체에 toLocalString()메서드를 사용해서 문자형식으로 변경해준다.
 * 
 * Delete의 기능구현을 위해 각각의 item들에 삭제버튼이 달려야한다.
 */

import styled from "styled-components";

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

// DiaryItem에서는 삭제기능을 위해 onDelete를 props로 또 받아준다.
const DiaryItem = ({ author, content, created_date, emotion, id, onDelete }) => {
  return (
    <DiaryItemWrap>
    <div className="DiaryItem" key={id}>
      <UserInfo>
        <span>작성자 : {author} | 감정점수 : {emotion}</span>
        <CreatedDate>{new Date(created_date).toLocaleString()}</CreatedDate>
      </UserInfo>
        <DiaryContent>{content}</DiaryContent>
    </div>
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
        onDelete(id);
      }
    }}>삭제하기</button>
    </DiaryItemWrap>
  )
}

export default DiaryItem;