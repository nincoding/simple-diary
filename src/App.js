import { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
import reducer from './store/reducer';
import DiaryStateContext from './contexts/DiaryStateContext';
import DiaryDispatchContext from './contexts/DiaryDispatchContext';
import { AppWrap } from './styles/AppWrap';

function App() {

  const [ data, dispatch ] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());
    
    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id : dataId.current++,
      }
    });
    
    dispatch({type: 'INIT', data: initData});
  }

  useEffect(() => {
    getData();
    
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE', 
      data: {
        author,
        content,
        emotion,
        id : dataId.current,
      },
    });

    dataId.current += 1;

  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({type: 'REMOVE', targetId});

  }, [])

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: 'EDIT', targetId, newContent});

  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.round((goodCount / data.length) * 100);

    return { goodCount, badCount, goodRatio };

  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };

  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
      <AppWrap>
        <DiaryEditor />
        <div>전체일기 : {data.length} </div>
        <div>기분 좋은 일기 개수: {goodCount} </div>
        <div>기분 나쁜 일기 개수: {badCount} </div>
        <div>기분 좋은 일기 비율 : {goodRatio} </div>
        <DiaryList />
      </AppWrap>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
