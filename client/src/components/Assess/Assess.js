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
        title: "13시",
        start: new Date(2021, 9, 12,0),
        end: new Date(2021, 9, 12,3),
    },
    {
        title: "16시",
        start: new Date(2021, 9, 12),
        end: new Date(2021, 9, 13)
    },
    {
        title: "14시",
        start: new Date(2021, 9, 15),
        end: new Date(2021, 9, 16)
    },
];

const Assess = () => {
    //
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }
    //
    const [target,setTarget] = useState(null); // 종목 선택 값
    const [isExecutive,setIsExecutive] = useState(false)
    
    const onChange = (e)=>{
        const {value} = e.target;
        setTarget(value);
        console.log(target)
    }

    useEffect(() => {
        const Tf = sessionStorage.getItem('isExecutive')
        if(Tf === 'true'){
            setIsExecutive(true)
        }else{
            setIsExecutive(false)
        }
    })

    useEffect(() => {
        axios.get(`/Assessment/${target}`)
        .then(res =>{
            console.log(res)
        })
    },[target])


    return (
        <div>
            <h2 className="basicTitle">병기본평가 +</h2>
            <div>
                
            </div>
            <span className="basicList" >
                <span className="margin270"></span>
                <input onChange={onChange} id="scale0" class="scale" name="scale" type="radio" value="shooting" />
                <label for="scale0" class="button">사격</label>
                <input onChange={onChange} id="scale1" class="scale" name="scale" type="radio" value="spirit" />
                <label for="scale1" class="button">정신전력평가</label>
                <input onChange={onChange} id="scale2" class="scale" name="scale" type="radio" value="stamina" />
                <label for="scale2" class="button">체력</label>
                <input onChange={onChange} id="scale3" class="scale" name="scale" type="radio" value="aid" />
                <label for="scale3" class="button">화생방</label>
                <input onChange={onChange} id="scale4" class="scale" name="scale" type="radio" value="rkrrowjsxn" />
                <label for="scale4" class="button">각개전투</label>
                <input onChange={onChange} id="scale5" class="scale" name="scale" type="radio" value="specialties" />
                <label for="scale5" class="button">주특기</label>
            </span>

            {isExecutive ? <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>:null}

            <div className="bigCalendar">
                <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" 
                style={{ height: 500, margin: "50px"}}  views={['month']} />

            </div>
        </div>


    );
};

export default Assess;