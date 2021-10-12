import React from 'react';
import './DetailHome.css'

const DetailHome = () => {
   

    return (
        <React.Fragment>
            <div middleWrap>
                <div className="topBanner">
                    <img src="img/wal.jpg" alt="상위 배너 사진" />
                </div>
        
                <div className="content" id="first">
                    <div>
                        <h2 className="middleTitle">병기본평가+</h2>
                        <div className="bigBox">
                            <div className="smallBox">
                                <p className="shoot">사격</p>
                                <div className="shootDetail">사격 평가 일정 안내 및 신청</div>
                            </div>
                            <div className="smallBox">```~
                                <p className="shoot">정신전력평가</p>
                                <div className="shootDetail">정신전력 평가 일정 안내 및 신청</div>
                            </div>
                            <div className="smallBox">
                                <p className="shoot">체력</p>
                                <div className="shootDetail">체력 평가 일정 안내 및 신청</div>
                            </div>
                            <div className="smallBox">
                                <p className="shoot">구급법 및 화생방</p>
                                <div className="shootDetail">구급법 및 화생방 평가 일정안내 및 신청</div>
                            </div>
                            <div className="smallBox">
                                <p className="shoot">각개전투</p>
                                <div className="shootDetail">각개전투 평가 일정 안내 및 신청</div>
                            </div>
                            <div className="smallBox">
                                <p className="shoot">주특기</p>
                                <div className="shootDetail">주특기 평가 일정 안내 및 신청</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content" id="second">
                    <h2 className="middleTitle">공지사항+</h2>
                    <div className="bigBox">
                        <div className="smallBox">
                            <p className="shoot2">군장병 코로나 방역수칙 안내</p>
                        </div>
                        <div className="smallBox">
                            <p className="shoot2">자유시간 관련 공지</p>
                        </div>
                        <div className="smallBox">
                            <p className="shoot2">휴가 및 외박 일정 안내</p>
                        </div>
                    </div>
                    </div>
                <div className="content" id="third">
                    <h2 className="middleTitle">커뮤니티+</h2>
                    <div className="bigBox2">
                        <div className="smallBoxLast">
                            <p className="shoot">오늘의 급식</p>
                        </div>
                        <div className="smallBoxLast">
                            <p className="shoot">마음의 편지</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DetailHome;