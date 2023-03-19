import React from "react";

const DiaryStateContext = React.createContext();




// DiaryStateContext이 Context도 export로 내보내줘야 다른 컴포넌트들도 공급자를 통해 전달받을 수 있다.
// export default는 파일하나당 하나밖에 쓸 수 없다.
// export const DiaryStateContext = React.createContext(); 이런식으로 써서 내보낼 수도 있다.
// import받을때 export default가 된 요소만 이름을 바꿔서 쓸 수 있고 export const로 내보낸 요소들은 비구조화 할당을 통해서만 받을 수 있다.
export default DiaryStateContext;