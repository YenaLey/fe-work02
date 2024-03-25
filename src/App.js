/*eslint-disable*/ //터미널에서 warning 메세지(Lint) 지워줌

import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])

  let [따봉, 따봉변경] = useState(Array(글제목.length).fill(0));
  let [유유, 유유변경] = useState(Array(글제목.length).fill(0));

  let [modal, setModal] = useState(false);

  let [모달제목, 모달제목변경] = useState('');

  let [입력값, 입력값변경] = useState('');

  return (
    <>
      <div>
        <h3 style={{ color: 'pink' }}>ReactBlog</h3>
      </div>
      <div className="App">
        <div className="left-container">
          {
            글제목.map(function (element, index) {
              return (
                <List 글제목={글제목} 글제목변경={글제목변경} 따봉={따봉} 따봉변경={따봉변경} 유유={유유} 유유변경={유유변경}
                  modal={modal} setModal={setModal}
                  모달제목변경={모달제목변경} index={index}>
                </List>
              )
            })
          }
        </div>
        <div className="right-container">
          {
            modal == true ? <Modal 모달제목={모달제목}></Modal> : null
          }
          <input className="inputbox" onChange={(e) => {
            입력값변경(e.target.value);
          }}>
          </input>
          <button className="inputbox" onClick={() => {
            if (입력값 != '') {
              const copy글제목 = [...글제목];
              const copy따봉 = [...따봉];
              const copy유유 = [...유유];
              copy글제목.unshift(입력값);
              copy따봉.unshift(0);
              copy유유.unshift(0);
              글제목변경(copy글제목);
              따봉변경(copy따봉);
              유유변경(copy유유);
            } else {
              alert("제목을 입력하세요");
            }
          }}>저장
          </button>
        </div>
      </div>
    </>
  );
}

//component

function List(props) {
  return (
    <div className="list">
      <h4 onClick={() => {
        if (props.modal == true) {
          props.setModal(false)
        } else {
          props.setModal(true);
          props.모달제목변경(props.글제목[props.index]);
        }
      }}>
        {props.글제목[props.index]}
        <span onClick={(e) => {
          const copy따봉 = [...props.따봉];
          copy따봉[props.index] += 1;
          props.따봉변경(copy따봉);
          e.stopPropagation();
        }}>👍
        </span>
        {props.따봉[props.index]}
        <span onClick={(e) => {
          const copy유유 = [...props.유유];
          copy유유[props.index] += 1;
          props.유유변경(copy유유);
          e.stopPropagation();
        }}>👎
        </span>
        {props.유유[props.index]}
      </h4>
      <p>12월 18일 발행</p>
      <button className="deletebox" onClick={() => {
        const copy글제목 = [...props.글제목];
        const copy따봉 = [...props.따봉];
        const copy유유 = [...props.유유];
        copy글제목.splice(props.index, 1);
        copy따봉.splice(props.index, 1);
        copy유유.splice(props.index, 1);
        props.글제목변경(copy글제목);
        props.따봉변경(copy따봉);
        props.유유변경(copy유유);
      }}>삭제
      </button>
    </div>
  )
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>제목: {props.모달제목}</h4>
      <p>날짜: 12월 18일</p>
      <p>상세내용: ~~!!</p>
    </div>
  )
}

export default App;