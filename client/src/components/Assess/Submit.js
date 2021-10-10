import React,{useEffect,useState, Component} from 'react';
import axios from 'axios';
import './ss.css'
import './Assess.css'


import { toDateString } from '../../Custom/toDateString';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";








const Submit = (props) => {

    const {target,allEvents,onRangeChange} = props;
    
    const [inputs,setInputs] = useState({
        date:null,
        time:null,
        applicantText:null
    })
    const [inputDate,setInputDate]= useState(null)
    //db등록 

        //setAllEvents([...allEvents,newEvent])
    
    //
    const onClick = (e)=>{
        const target = e.event._def.title.split(" ")[0]
        const data = {
            'date': e.event._def.extendedProps.dd
        }
        console.log(target)
        
        let conf = window.confirm(`신청종목 : ${target} 날짜 : ${data.date} 신청하기`)

        if (conf){
            axios.post(`/assessment/${target}/application`,data)
            .then(res=>{
                console.log(res.data)
                if(res.data.success === 'true'){
                    alert('신청완료')
                    window.location.replace("/assess")
                }else{
                    alert(`${res.data.data}`)
                }
        }).catch(()=>{
            alert('문자열 오류')
        })
        }
    }

    
    return (
        <div className="assessBox">
            <div className="assessTextBox">
                <div className="assessText">응시 희망 날짜 및 시간</div>
            </div>
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
                        eventClick={onClick}
                        events={allEvents}
                        //select={onCalenderClick}
                        eventLimit={3}
                    />
            </div>
        </div>
    );
};

export default Submit;