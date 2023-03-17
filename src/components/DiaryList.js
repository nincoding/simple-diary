import styled from 'styled-components';
import DiaryItem from './DiaryItem';

const DiaryListWrap = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 20px;
`;

const DiaryListH2 = styled.h2`
  text-align: center;
`;


/**
 * @returns 
 * App에서 전달받은 dummyData가 정상적으로 props로 받았는지 확인해본다.
 * 일기아이템에 map을 사용해서 받아온 배열안의 객체의 프로퍼티를 이용해서 데이터를 꺼내보자.
 * 그런데 만약 App에서 props으로 dummyData가 아니라 undefined를 전달했다면 에러가 발생하게 된다.
 * 배열의 length를 사용했기때문에 undefined를 받으면 에러가 나는 것이다.
 * 이럴때 사용하는 것이 바로 defaultProps이다. defaultProps는 undefined로 설정될 수 있을것 같은 값들의 기본값을 설정할 수 있는 것이다.
 * 
 * CRUD의 기능들까지 다 이 map안에 만들어주게되면 에러가 날 확률이 굉장히 높기때문에
 * DiaryList안에 list들을 렌더링해주는 코드들을 별도의 컴포넌트로 분할 시켜줘야한다. (아이템들 틀에 맞춰서 찍어내는 컴포넌트)
 * 
 * onDelete함수를 전달받아서 DiaryItem한테 전달해준다.
 * 이런걸 props 드릴링이라고 한다.
 */

const DiaryList = ({ diaryList, onDelete }) => {

  // console로 확인해보면 일기 데이터가 잘 출력된다.
  // 전달받은 데이터가 배열이기 때문에 length를 이용해서 diaryList.length와 같이 데이터의 개수를 출력할 수 있다.
  //console.log(diaryList);

  return (
    <DiaryListWrap>
    <div className='DiaryList'>
      <DiaryListH2>일기 리스트</DiaryListH2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        { 
        //이 it에는 일기데이터의 요소가 하나하나 it으로 바껴서 들어오는것이다. 즉 배열안에 들어있는 각각의 객체 하나를 의미한다.
        //이렇게 배열의 요소를 list형태로 잘 렌더링 하는것을 확인할 수 있다.
        // map을 이용해서 list를 만들어줬을때 각각의 자식요소들이 고유한 key props을 전달받아야한다.
        // 가장 최상위 div에 key에 만들어놨던 고유한 id값을 props으로 설정해주면 된다.
        // 데이터에 만약 고유한 아이디가 없을때 사용할 수 있는 방법으로는 map 내장함수의 두번째 인자인 index를 이용하면된다.
        /*
        diaryList.map((it, idx) => {
          <div key={idx}></div>
        })
        이런식으로 인덱스로 사용도 가능하지만, 만약 인덱스의 순서를 바꾸게되었을때 리액트에서 문제가 생길 수 가있다.
        그래서 굳이 인덱스를 쓰지말고 고유한 아이디를 쓰는 것이 중요하다.
        */
       // 이 DiaryList컴포넌트가 렌더링하는 자식이 DiaryItem 컴포넌트가 되도록 수정해준다.
       // 이 DiaryItem은 일기를 모두 받아서 렌더링해야되고 list의 아이템이기 때문에 일단 key를 it.id로 전달해준다.
       // 그리고 스프레드 연산자를 통해서 it이 가지고 있는 모든 데이터들을 전달해준다.

       // Delete기능 구현을 위해 onDelete함수는 2다리를 거쳐서 내려갔다.
        diaryList.map((it) => <DiaryItem key={it.id} {...it} onDelete={onDelete}/>
        /*
          <div key={it.id}>
            <div >작성자 : {it.author}</div>
            <div >일기 : {it.content}</div>
            <div >감정 : {it.emotion}</div>
            <div >작성 시간(ms) : {it.created_date}</div>
          </div>
        */
        )
        }
      </div>
    </div>
    </DiaryListWrap>
  )
}

// DiaryList의 diaryList 프로퍼티의 기본값을 빈배열로 설정해주자. (length를 사용하고 있고, 어차피 DiaryList는 배열을 사용하기 때문)
// 이렇게 설정해주면 undefined가 props로 전달되어도 []로 초기설정되있다.

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;