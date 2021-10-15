import React,{useState,useRef} from 'react';

import axios from 'axios';
import './ss.css'
import './Assess.css'


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { toDateString } from '../../Custom/toDateString';
import ExeCurrent from './ExeCurrent'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";




const ExeSubmit = (props) => {

    const {allEvents,onRangeChange} = props;
    const [check,setCheck] = useState(false)
        
    const [go,setGo] = useState({
        target:"",
        date:""
    })

    //신청인원확인
    const eventClick = async (event)=>{
        const newDate =toDateString(event.event._instance.range.start)
        const newTarget = (event.event._def.title.split(" ")[0])
        //setCheck(true)
        setCheck(true)

        setGo({
            ...go,
            target:newTarget,
            date:newDate
        })
        sessionStorage.setItem('target', newTarget)
        sessionStorage.setItem('date', newDate)
        
        alert(`${newDate} 신청인원확인하기`)

    }

    // 이벤트 작성
    const onCalenderClick = (e)=>{
        
        let goTarget = prompt("종목 : shooting, cBR, firstAid, individualBattle, speciality, strength")
        let intime = ""
        let applicant_capacity = ""

        if(goTarget !=="" && goTarget !==null){
            intime = prompt("시간설정 :");

            if(intime !=="" && intime !==null){
                const time = goTarget+" " + intime
                applicant_capacity =prompt("인원설정 : (명)");

                if(applicant_capacity !=="" && applicant_capacity !==null){

                    const data={
                        date:toDateString(e.start),
                        applicant_capacity:applicant_capacity,
                        time:time
                    }
                    if(time !=="" && time !==null && applicant_capacity !== "" && applicant_capacity !==null){
                        axios.post(`/management/${goTarget}/assessment`,data)
                        .then(res=>{
                            if(res.data.success===true){
                                alert('등록 성공')
                                window.location.replace("/assess")
                            }else{
                                alert(`${res.data.data}`)
                            }
                        })
                    }
                }
            }
        }
    }
    const onOn = ()=>{
        setCheck(true)
    }
    const onOff =()=>{
        setCheck(false)
    }
    
    return (
        <div>
            {check===false ?
            <div className="assessBox">
                <div className="bigCalendar">
                    <FullCalendar
                        
                        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                        defaultView="dayGridMonth"
                        displayEventTime={true}
                        header={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                        }}
                        selectable={true}
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin,
                            resourceTimeGridPlugin
                        ]}
                        eventClick={eventClick}
                        events={allEvents}
                        select={onCalenderClick}
                        eventLimit={3}
                    />
                </div>
            </div>
            
            :
            <div>
                <Router>
                    <Route to="/assess" render={ () => <ExeCurrent target={go.target} onOff={onOff} date={go.date} />}  /> {/*동일 */}
                </Router>
            </div>
            }
        </div>
    );
};

export default ExeSubmit;