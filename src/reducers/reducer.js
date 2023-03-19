/**
 *  이 reducer 함수는 2개의 파라미터를 받는다.
 *  첫번째 인자는 상태변화가 일어나기 직전의 state가 된다.
 *  두번째 인자는 어떤 정보들이 들어있는 action 객체이다.
 *  이 action 객체의 type을 통해 switch case를 통해 상태변화를 처리할 수 있다.
 *  그리고 reducer가 return하는 값들이 새로운 상태의 값이 된다.
 *  dispatch가 실행되면 reducer가 호출되고 그 reducer가 action type에 따라 새로운 값을 state에 넣는 형태
 *  그 전에 어떤 type들이 들어있는지 먼저 알아봐야한다.
 * App컴포넌트의 getData함수의 경우 data의 type이 INIT인 경우로 설정할 수 있다.
 * CREATE, REMOVE, EDIT으로 적절히 설정해준다.
 * 
 * switch case문 같은 경우 반드시 dafault가 있어줘야한다.
 */


const reducer = (state, action) => {
  switch(action.type) {
    // INIT 타입의 데이터를 받았을때 적절한 코드를 작성해준다.
    // action객체의 프로퍼티 data에 initData를 넣어놨기때문에 그 값을 반환해준다.
    case 'INIT' : {
      return action.data
    }
    // reducer에서는 created_date를 못받았기때문에 설정해준다.
    // 받아온 action객체의 data에 created_date를 추가해서 newItem으로 설정해서 넣어준다.
    case 'CREATE' : {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      // 이 새로운 일기아이템을 원본배열에 추가해서 그 새로운 배열을 newState의 값으로 사용한다.
      return [newItem, ...state];
    }
    case 'REMOVE' : {
      // state안에 있는 배열요소가 targetId가 아닌 요소들만 필터링해서 새로운 배열로 반환해준다.
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT' : {
      // 수정하고자 하는 요소를 만난 경우 원래 객체의 값을 넣어준다음 content의 값만 변경해준다. 
      return state.map((it) => it.id === action.targetId ? {
        ...it, content : action.newContent
      } : it
      )
    }
    // default의 경우 type을 잘못 전달 받았다고 판단해서 상태를 변경시키지 않도록 해주었다.
    default : 
    return state;
  }
}

export default reducer;