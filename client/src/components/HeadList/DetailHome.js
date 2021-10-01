import React from 'react';
import './Header'

const DetailHome = () => {
    const smallStyle = {
        fontSize: "12px",
        textAlign: "center"
      };

    return (
        <React.Fragment>
            <div className="topBanner">
                <img src="img/wal.jpg" alt="상위 배너 사진" />
            </div>

            <div className="content">
                <h2>병기본평가+</h2>
                <div className="basicTest">
                <p className="test">
                    사격<br></br>
                    <div style={smallStyle}>사격 평가 일정 안내 및 신청</div>
                </p>

                <p>정신전력평가</p>

                <p>체력</p>

                <p>구급법 및 화생방</p>

                <p>각개전투</p>
                <p>주특기</p>
                </div>

                <h2>공지사항+</h2>
                <div className="notice">
                <p>군장병 코로나 방역수칙 안내</p>
                <p>자유시간 관련 공지</p>
                <p>휴가 및 외박 일정 안내</p>
                </div>

                <h2>커뮤니티+</h2>
                <div className="community">
                <p>오늘의 급식</p>
                <p>마음의 편지</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DetailHome;