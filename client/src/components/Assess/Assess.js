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
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import exeSubmit from './exeSubmit';
import exeCurrent from './exeCurrent';
import exeResult from './exeResult';
import submit from './submit';
import current from './current';
import result from './result';

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

const Assess = () => {
    //
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
        axios.get(`/assessment/${target}`)
        .then(res =>{
            console.log(res)
        })
    },[target])


    return (
        <div>
            <h2 className="basicTitle">병기본평가 +</h2>

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

            {isExecutive ?
            <div>
                <Router>
                    <Link to="/assess/exeSubmit">평가일정등록 </Link>
                    <Link to="/assess/exeCurrent">신청인원확인 </Link>
                    <Link to="/assess/exeResult">평가결과등록 </Link>


                    <Switch>
                        <Route path="/assess/exeCurrent" component={exeCurrent}/>
                        <Route path="/assess/exeResult" component={exeResult}/>
                        <Route path="/assess" component={exeSubmit}/>
                        
                    </Switch>
                </Router>
            </div>
            :
            <div>
                <Router>
                    <Link to="/assess/submit">평가일정등록 </Link>
                    <Link to="/assess/current">신청인원확인 </Link>
                    <Link to="/assess/result">평가결과등록 </Link>
                    <Switch>
                        <Route path="/assess/current" component={current}/>
                        <Route path="/assess/result" component={result}/>
                        <Route path="/assess" component={submit}/>
                    </Switch>
                </Router>
            </div>
            }

            {
            <div>
                <input placeholder="시간시간" style={{ width: "20%", marginRight: "10px" }} value={post.start} onChange={(e) => setPost({ ...post, start: e.target.value })} />
                <input placeholder="종료시간" style={{ width: "20%", marginRight: "10px" }} value={post.end} onChange={(e) => setPost({ ...post, end: e.target.value })} />
                <input placeholder="applicant_capacity" style={{ width: "20%", marginRight: "10px" }} value={post.applicant_capacity} onChange={(e) => setPost({ ...post, applicant_capacity: e.target.value })} />
                <DatePicker placeholderText="날짜" style={{ marginRight: "10px" }} selected={post.date} onChange={(date) => setPost({ ...post, date })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    일정 추가
                </button>
            </div>:null
            }

            <div className="bigCalendar">
                <Calendar localizer={localizer} events={allEvents} startAccessor="date" endAccessor="date" 
                style={{ height: 500, margin: "50px"}}  views={['month']} />

            </div>
        </div>


    );
};

export default Assess;