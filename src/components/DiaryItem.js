/**
 * 전달된 props를 형식에 맞게 다 받아와준다. (사용했던 객체 프로퍼티 키들 { author, content, created_date, emotion, id })
 * 작성시간을 만들때 더미데이터에서 new Date().getTime()으로 ms 숫자로 받아와줬기때문에
 * 사람이 알아볼 수 있도록 바꿔준다. 이 ms를 new Date(ms)이런식으로 넣어주면 이 시간을 기준으로 Date객체가 생성된다.
 * 이 생성된 Date객체에 toLocalString()메서드를 사용해서 문자형식으로 변경해준다.
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

const DiaryItem = ({ author, content, created_date, emotion, id }) => {
  return (
    <DiaryItemWrap>
    <div className="DiaryItem" key={id}>
      <UserInfo>
        <span>작성자 : {author} | 감정점수 : {emotion}</span>
        <CreatedDate>{new Date(created_date).toLocaleString()}</CreatedDate>
      </UserInfo>
        <DiaryContent>{content}</DiaryContent>
    </div>
    </DiaryItemWrap>
  )
}

export default DiaryItem;