import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './ss.css'
import './Assess.css'

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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




const Submit = (props) => {

    const {target,allEvents} = props;
    
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
        const {date,title,applicantText,expired} = e
        setInputs({
            ...inputs,
            date:date,
            time:title,
            applicantText:applicantText
        })
        const dateString = toDateString(date)
        setInputDate(dateString)
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        const dateString = toDateString(inputs.date)
        console.log(dateString)


        axios.post(`/assessment/${target}/application`,{
            'date':dateString
        })
        .then(res=>{
            console.log(res.data.data)
            alert(res.data.data)
            window.location.replace("/assess")
        })
    }
    const toDateString = (godate)=>{
        

        const year = godate.getFullYear();
        const month = ('0' + (godate.getMonth() + 1)).slice(-2);
        const day = ('0' + godate.getDate()).slice(-2);

        const dateString = year + '-' + month  + '-' + day;

        return dateString;
    }
 
    return (
        <div className="assessBox">
            <div className="assessTextBox">
                <div className="assessText">응시 희망 날짜 및 시간</div>
            </div>
            <div className="bigCalendar">
                <Calendar onSelectEvent={onClick} localizer={localizer} events={allEvents} startAccessor="date" endAccessor="date" 
                style={{ height: 500, margin: "50px"}}  views={['month']} />
            </div>
            <form className="assessForm">
                <span>날짜: </span>
                <input placeholder="date" value={inputDate} />
                <span>시간: </span>
                <input placeholder="time" value={inputs.time} />
                <span>인원현황: </span>
                <input placeholder="applicantText" value={inputs.applicantText}  />
                <button onClick={onSubmit}>신청</button>
            </form>
        </div>
    );
};

export default Submit;