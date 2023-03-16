import './App.css';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
import dummyData from './data/dummyDate';

/**
 * 
 * @returns 오늘의 일기 입력폼, 일기 리스트 출력폼
 * DiaryList 컴포넌트에 dummyData를 props로 전달해준다.
 */

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyData} />
    </div>
  );
}

export default App;
