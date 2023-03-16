/**
 * 일기 리스트를 렌더링할 DiaryList에 props로 전달해서 렌더링하는 과정을 연습해보자.
 * 일기도 데이터기 때문에 모든 데이터는 고유한 id를 가지고 있다.
 * 작성자와 일기본문, 감정 점수를 가지고 있는 데이터더미이다.
 * 마지막으로 이 일기가 언제 작성되었는지를 표시할 날짜를 가지고 있다.
 * 시간 객체에 아무것도 전달하지않으면 현재 시간을 기준으로 생성된다.
 * 이 Date객체를 직접 객체에 담으면 불편하다. getTime()으로 숫자로 변환해서 사용하자.
 * getTime함수는 시간을 받아서 밀리세컨드로 숫자로 변환해주는 함수이다.
 */

const dummyData = [
  {
    id: 1,
    author: "nincoding1",
    content: "hello",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "nincoding2",
    content: "hi",
    emotion: 4,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "nincoding3",
    content: "hello hi",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "nincoding4",
    content: "bye",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "nincoding5",
    content: "ho!",
    emotion: 1,
    created_date: new Date().getTime(),
  },
]

export default dummyData;