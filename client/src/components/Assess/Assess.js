import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import './Assess.css'

function Assess() {
  // inline style 지정을 위한 공간. (글씨 한줄의 스타일 같은건 여기서 지정!! 모든 스타일에 class 나 id를 부여하지 않기 위함!)
  const headrStyle = {
    width: "100%"
  };

  const leftStyle = {
    fontSize: "17px",
    textAlign: "left",
    marginLeft: "20px"
  };

  const Top = {
    backgroundColor: "#fcd165",
    marginBottom: "50px"
  };

  const bannerStyle = {
    marginLeft: "100px",
    marginRight: "91.px",
    textAlign: "center"
  };

  const inputStyle = {
    backgroundColor: "#ffe910",
    width: "120px",
    margin: "10px"
  };

  const calendarStyle = {
    width: "200px"
  };

  const [selectedDate, setSelectedDate] = useState(null);

  let subject = " 사격 ";

  return (
    <React.Fragment>
      {/* 전체를 묶는 div없도록! Fragment 이용 /
header부분 __________________________inline으로 css이용하기! */}

      <div style={Top}>
        <div className="Header" style={headrStyle}>
          <h1>슬기로운 병영생활</h1>
        </div>

        <div style={bannerStyle}>
          <div className="container">
            <p> 홈 </p>
            <p> 병기본평가 </p>
            <p> 커뮤니티 </p>
            <p> 마이페이지 </p>
            <p> </p>
            <p> 로그인 </p>
            <p> 회원가입 </p>
          </div>
        </div>
      </div>
      {/* 여기까지가 상위 배너 // 링크는 나중에 추가! 일단 틀만.. */}

      <div className="start">
        <h2>병기본평가+</h2>

        <div className="basicTest">
          <div class="item">
            <div>사격</div>
          </div>

          <div class="item">
            <input type="button" value="정신전력" />
          </div>

          <div class="item">
            <div>체력</div>
          </div>

          <div class="item">
            <div>구급법</div>
          </div>

          <div class="item">
            <div>화생방</div>
          </div>

          <div class="item">
            <div>각개전투</div>
          </div>

          <div class="item">
            <div> 경계</div>
          </div>

          <div class="item">
            <div> 주특기</div>
          </div>
        </div>

        <div className="content">
          <div className="register">
            <div style={leftStyle}>
              신청+ <br></br> <br></br>
              1.소속 및 관등성명
              <div className="group">
                <input style={inputStyle}></input> 대대
                <input style={inputStyle}></input> 중대
                <input style={inputStyle}></input> 소대
              </div>
            </div>
          </div>

          <div>
            <div style={leftStyle}> 2.용사 희망 날짜 및 시간</div>
            <br></br>
            <br></br>

            {/* 여기서부터는 달력 구현 */}
            <div id="ekffur">
              <Calendar style={calendarStyle} />
            </div>
            {/* 여기까지가 달력  이 위에거를 big calendar 로!! */}

            <div className="selectDay" style={leftStyle}>
              날짜 :{" "}
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />
              </div>
              시간 : <input style={inputStyle}></input>
            </div>
          </div>
          <button>신청</button>
        </div>
      </div>

      {/* 여기까지가 content!!! 위의 basicTest 의 onClick 에 따라 바뀌는 내용 */}

      <div className="footerContainer">
        <p>슬기로운 병영생활</p>
        <div className="footerTwo">
          <p>대표이메일 seulgiarmy@naver.com</p>
        </div>
        <p>이용약관</p>
        <p>개인정보 처리방침</p>
      </div>

      </React.Fragment>
  );
}
    


export default Assess;

/* 추가해야하는 기능
정신전력, 사격, 체력 등 각 과목을 클릭했을 시 
그 밑에 평가 신청, 평가 결과 확인  및 그에 따른 달력(신청지) 가 나오도록 할것.
달력에 각 해당 일자에 응시가 가능한 시간이 나올 수 있도록 할것.(빨강,파랑,회색 이용.)
신청지내에 있는 소속 및 관등성명. 용사 희망 날짜 및 시간등의 정보를 
백엔드에 넘길 수 있도록 할것. */