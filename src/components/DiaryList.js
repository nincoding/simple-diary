import { useContext } from 'react';
import DiaryStateContext from '../contexts/DiaryStateContext';
import DiaryItem from './DiaryItem';
import { DiaryListWrap, DiaryListH2 } from '../styles/DiaryList';

const DiaryList = () => {

  const diaryList = useContext(DiaryStateContext);

  return (
    <DiaryListWrap>
      <DiaryListH2>일기 리스트</DiaryListH2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        { 
          diaryList.map((it) => <DiaryItem key={it.id} {...it} />)
        }
      </div>
    </DiaryListWrap>
  )
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;