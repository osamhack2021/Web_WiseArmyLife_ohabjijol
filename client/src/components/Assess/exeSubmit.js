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
    const {target,allEvents} = props;

    const [newPost,setNewPost] = useState({
        date:null,
        aplicant_capacity:null,
        time:null
    })
    
    

    const onConsole = (e)=>{
        console.log(target)
    }
    const onChange = (e)=>{
        const {name,value} = e.target;
        setNewPost({
            ...newPost,
            [name]:value,
        })
    }
    const goPost = (e)=>{
        e.preventDefault();
        const godate = newPost.date;

        const year = godate.getFullYear();
        const month = ('0' + (godate.getMonth() + 1)).slice(-2);
        const day = ('0' + godate.getDate()).slice(-2);

        const dateString = year + '-' + month  + '-' + day;
        const data={
            date:dateString,
            aplicant_capacity:newPost.aplicant_capacity,
            time:newPost.aplicant_capacity
        }

        console.log(data);
        axios.post(`/management/${target}/assessment`,data)
        .then(res=>{
            console.log(res);
        })
    }
    const onCalenderClick = (e)=>{
        setNewPost({
            ...newPost,
            date:e
        })
    }
    return (
        <div>
            <div className="bigCalendar">
                <Calendar onDrillDown={onCalenderClick} localizer={localizer} events={allEvents} startAccessor="date" endAccessor="date" 
                style={{ height: 500, margin: "50px"}}  views={['month']} />
            </div>
            <button onClick={onConsole}>콘솔</button>

            <form>
                <input placeholder="date" name="date" value={newPost.date} onChange={onChange}/>
                <input placeholder="aplicant_capacity" name="aplicant_capacity" value={newPost.aplicant_capacity} onChange={onChange}/>
                <input placeholder="time" name="time" value={newPost.time} onChange={onChange}/>
                <button onClick={goPost}>간부 등록</button>
            </form>
        </div>
        
        
    );
};

export default ExeSubmit;