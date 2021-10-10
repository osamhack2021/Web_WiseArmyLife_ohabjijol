import React,{useState} from 'react';

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';
import './ss.css'
import './Assess.css'
import { Redirect ,useHistory} from 'react-router-dom';
import { CustomToolbar,CustomDateHeader } from './CustomCal';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

const defaultEvents = [
    {
        title: "각개전투 14:00 1/30",
        date: new Date("2021-10-21"),
        allDay:true,
        day : new Date("2021-10-21")
    },
    {
      title: "event 2",
      start: "2019-12-01",
      end: "2019-12-05",
      allDay: true,
      HostName: "William"
    },
    {
      title: "event 3",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    },
    {
      title: "event 4",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    },
    {
      title: "event 5",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    },
    {
      title: "event 6",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    }
  ]

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



const ExeSubmit = (props) => {
    const {target,allEvents,onRangeChange} = props;
    const history = useHistory();

    const [newPost,setNewPost] = useState({
        date:null,
        applicant_capacity:null,
        time:null
    })
    const [inputDate,setInputDate]= useState(null)
    const [delDate,setDelDate] = useState("")
    const [applicantText,setApplicantText] = useState("")
    const onConsole = (e)=>{
        console.log(allEvents)
    }
    const onChange = (e)=>{
        const {name,value} = e.target;
        setNewPost({
            ...newPost,
            [name]:value,
        })
    }
    const eventClick = (event)=>{
        const date =toDateString(event.event._instance.range.start)
        console.log(date)
        alert(`${date} 신청인원확인`)
        // 인원확인창으로 보내기
    }
    const onCalenderClick = (e)=>{
        setNewPost({
            ...newPost,
            date:e.start
        })
        setInputDate(toDateString(e.start))
        const goTarget = prompt("종목 : ex) shooting")
        const time = prompt("시간설정 :");
        const applicant_capacity =prompt("인원설정 : (명)");

        const data={
            date:inputDate,
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
    const toDateString = (godate)=>{
        const year = godate.getFullYear();
        const month = ('0' + (godate.getMonth() + 1)).slice(-2);
        const day = ('0' + godate.getDate()).slice(-2);

        const dateString = year + '-' + month  + '-' + day;

        return dateString;
    }
    const selectCal = (e)=>{
        setApplicantText(e.applicantText)
        setDelDate(toDateString(e.date))
    }
    const onRemove = (e)=>{
        e.preventDefault()
        axios.delete(`/management/${target}/assessment/${delDate}`)
        .then(res=>{
            if(res.data.success ===true){
                alert('삭제완료')
                window.location.replace("/assess")
            }else{
                alert('삭제실패')
            }
        })
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
                    events={defaultEvents}
                    select={onCalenderClick}
                    eventLimit={3}
                />
            </div>
        </div>
        
        
    );
};

export default ExeSubmit;