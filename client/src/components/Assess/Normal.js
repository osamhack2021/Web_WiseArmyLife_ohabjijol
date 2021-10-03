import React, { useState ,useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import './Assess.css'
import Executive from './Normal';

const Normal = () => {
        
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
            <div className="start">
                <h2>병기본평가+</h2>

                <div className="basicTest">
                <div class="item">
                    <div>사격</div>
                </div>

                <div class="item">
                    <div>정신전력</div>
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
                    {/* 여기까지가 달력 */}

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
        </React.Fragment>
    );    
};

export default Normal;