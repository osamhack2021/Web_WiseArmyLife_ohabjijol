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
        date : new Date(2021,9,6),
        title : "13:00 ~ 16:00",
        applicant_capacity:30,
        expired : "Applying"
    },
    {
        date : new Date(2021,9,6),
        title : "18:00 ~ 19:00",
        applicant_capacity:40,
        expired : "Applying"
    }
];


const Submit = (props) => {

    const {target} = props;
    const [post, setPost] = useState({ start:null,end:null,date:null, applicant_capacity:null});
    const [allEvents, setAllEvents] = useState(events);
    const [inputs,setInputs] = useState({
        date:null,
        time:null,
        applicant_capacity:null
        
    })
    //db등록 
    function handleAddEvent() {
        const data = {
            time:`${post.start}~${post.end}`,
            date:post.date,
            applicant_capacity:post.applicant_capacity
        }
        axios.post(`/assessment/${target}/application`,data)
        setPost({
            ...post,
            start:null,
            end:null,
            date:null,
            applicant_capacity:null
        })
        axios.get(`/assessment/${target}`)
        .then(res =>{
            const {date,title,expired} = res.data.data;
            const newEvent ={
                date:date,
            }
        })

        //setAllEvents([...allEvents,newEvent])
    }
    //
    const onClick = (e)=>{
        const {date,title,applicant_capacity,expired} = e

        const tmp = 

        setInputs({
            ...inputs,
            date:date,
            time:title,
            applicant_capacity:applicant_capacity
        })
    }
    const onChange = (e)=>{
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }

 
    return (
        <div>
            <div className="bigCalendar">
                <Calendar onSelectEvent={onClick} localizer={localizer} events={allEvents} startAccessor="date" endAccessor="date" 
                style={{ height: 500, margin: "50px"}}  views={['month']} />
            </div>
            <form>
                <input value={inputs.date} onChange={onChange} />
                <input value={inputs.time} onChange={onChange} />
                <input value={inputs.applicant_capacity} onChange={onChange} />
                <button>등록</button>
            </form>
        </div>
    );
};

export default Submit;