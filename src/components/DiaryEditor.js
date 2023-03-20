import React, { useState, useRef, useContext } from 'react';
import DiaryDispatchContext from '../contexts/DiaryDispatchContext';
import { DiaryEditorWrap, AuthorInput, ContentTextarea, EmotionSelect, SubmitButton } from '../styles/DiaryEditor';

const DiaryEditor = () => {

  const { onCreate } = useContext(DiaryDispatchContext);
  const [ state, setState ] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  const authorInput = useRef();
  const contentInput = useRef();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value,
    });
  }

  const handleSubmit = (e) => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  }

  return (
    <DiaryEditorWrap>
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <AuthorInput
          ref = { authorInput }
          name = 'author'
          value = { state.author } 
          onChange = { handleChangeState }
        />
      </div>
      <div>
        <ContentTextarea
          ref = { contentInput }
          name = 'content'
          value = { state.content } 
          onChange = { handleChangeState }
        />
      </div>
      <div>
        오늘의 감정점수:
        <EmotionSelect
          name='emotion'
          value={ state.emotion }
          onChange={ handleChangeState }
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </EmotionSelect>
      </div>
      <div>
        <SubmitButton onClick={handleSubmit}>일기 저장하기</SubmitButton>
      </div>
    </div>
    </DiaryEditorWrap>
  )
}

export default React.memo(DiaryEditor);