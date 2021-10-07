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



const events = [
    {
        date: new Date(2021,9,7),
        title: "13시~14시",
        applicantText : "20/30",
        expired:"Applying"
    }
];


const Submit = (props) => {

    const {target} = props;
    const [post, setPost] = useState({ start:null,end:null,date:null, applicant_capacity:null});
    const [allEvents, setAllEvents] = useState(events);
    const [inputs,setInputs] = useState({
        date:null,
        time:null,
        applicantText:null
    })
    
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
    }
    const onChange = (e)=>{
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        const godate = inputs.date;

        const year = godate.getFullYear();
        const month = ('0' + (godate.getMonth() + 1)).slice(-2);
        const day = ('0' + godate.getDate()).slice(-2);

        const dateString = year + '-' + month  + '-' + day;
        axios.post(`/assessment/${target}/application`,dateString)
        .then(res=>{
            console.log(res)
        })
    }
 
    return (
        <div>
            <div className="bigCalendar">
                <Calendar onSelectEvent={onClick} localizer={localizer} events={allEvents} startAccessor="date" endAccessor="date" 
                style={{ height: 500, margin: "50px"}}  views={['month']} />
            </div>
            <form>
                <input placeholder="date" value={inputs.date} />
                <input placeholder="time" value={inputs.time} />
                <input placeholder="applicantText" value={inputs.applicantText}  />
                <button onClick={onSubmit}>등록</button>
            </form>
        </div>
    );
};

export default Submit;