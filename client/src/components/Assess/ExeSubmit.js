import React,{useState} from 'react';

import axios from 'axios';
import './ss.css'
import './Assess.css'
import { Redirect ,useHistory} from 'react-router-dom';


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { toDateString } from '../../Custom/toDateString';



const ExeSubmit = (props) => {

    const {allEvents,onRangeChange} = props;


    const onConsole = (e)=>{
        console.log(allEvents)
    }

    //신청인원확인
    const eventClick = (event)=>{
        const date =toDateString(event.event._instance.range.start)
        console.log(date)
        alert(`${date} 신청인원확인`)
        // 인원확인창으로 보내기
    }

    // 이벤트 작성
    const onCalenderClick = (e)=>{
        
        const goTarget = prompt("종목 : ex) shooting")
        const intime = prompt("시간설정 :");
        const time = goTarget+" " + intime
        const applicant_capacity =prompt("인원설정 : (명)");
        const data={
            date:toDateString(e.start),
            applicant_capacity:applicant_capacity,
            time:time
        }
        if(time !=="" && time !==null && applicant_capacity !== "" && applicant_capacity !==null){
            console.log(data)
            axios.post(`/management/${goTarget}/assessment`,data)
            .then(res=>{
                
                if(res.data.success===true){
                    alert('등록 성공')
                    window.location.replace("/assess")
                }else{
                    console.log(data)
                    alert(`${res.data.data}`)
                }
            })
        }
    }

    return (
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
            <button onClick={onConsole}>콘솔</button>
        </div>
        
        
    );
};

export default ExeSubmit;