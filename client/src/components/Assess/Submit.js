import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './ss.css'
import './Assess.css'

// 여긴 진중 수정
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
];


const Submit = (props) => {

    const {target} = props;
    const [post, setPost] = useState({ start:null,end:null,date:null, applicant_capacity:null});
    const [allEvents, setAllEvents] = useState(events);

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

 
    return (
        <div>
            <div className="bigCalendar">
                <Calendar localizer={localizer} events={allEvents} startAccessor="date" endAccessor="date" 
                style={{ height: 500, margin: "50px"}}  views={['month']} />

            </div>
        </div>
    );
};

export default Submit;