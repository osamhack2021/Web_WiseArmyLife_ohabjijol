import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import './ss.css'
import './Assess.css'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ExeCurrent from './ExeCurrent';
import ExeResult from './ExeResult';
import ExeSubmit from './ExeSubmit';
import Current from './Current';
import Result from './Result';
import Submit from './Submit';

const events = [
    {
        date: new Date(2021,9,7),
        title: "13시~14시",
        applicantText:"20/30",
        expired:"Applying"
    }
];

const Assess = () => {
    //
    const [target,setTarget] = useState("shooting"); // 종목 선택 값
    const [isExecutive,setIsExecutive] = useState(false)
    const [allEvents, setAllEvents] = useState(events);

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
            console.log(res.data.data)
            const getData = res.data.data;
            const inDateList = getData.map( res=> {
                return {
                    date : new Date(res.date),
                    title : res.time,
                    applicantText : `${res.number_of_applicant}/${res.applicant_capacity}`,
                    expired : res.expired
                }
            })
            setAllEvents([...inDateList])
        })
    },[target])

    /**
     *  applicant_capacity: 20
        date: "2021-10-26"
        expired: "Applying"
        number_of_applicant: 0
        time: "12:00 ~ 13:00"
     */

    const onChange = (e)=>{
        const {value} = e.target;
        setTarget(value);
        console.log(target)
    }

    
    return (
        <div>
            <h2 className="basicTitle">병기본평가 +</h2>

            <span className="basicList" >
                <span className="margin230"></span>
                <input checked={target === "shooting"} onChange={onChange} id="scale0" class="scale" name="scale" type="radio" value="shooting" />
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
                    <div className="assessLinkBox">
                        <Link className="assessLink" to="/assess/exeSubmit">평가일정등록 </Link>
                        <Link className="assessLink" to="/assess/exeCurrent">신청인원확인 </Link>
                        <Link className="assessLink" to="/assess/exeResult">평가결과등록 </Link>
                    </div>

                    <Switch>
                        <Route path="/assess/exeCurrent" component={ExeCurrent}/>
                        <Route path="/assess/exeResult" component={ExeResult}/>
                        <Route path="/assess" render={ () => <ExeSubmit target={target} allEvents={allEvents} />}/>
                        
                    </Switch>
                </Router>
            </div>
            :
            <div>
                <Router>
                    <div className="assessLinkBox">
                        <Link className="assessLink" to="/assess/submit">평가일정등록 </Link>
                        <Link className="assessLink" to="/assess/current">신청인원확인 </Link>
                        <Link className="assessLink" to="/assess/result">평가결과등록 </Link>
                    </div>
                    <Switch>
                        <Route path="/assess/current" component={Current}/>
                        <Route path="/assess/result" component={Result}/>
                        <Route path="/assess" render={ () => <Submit target={target} allEvents={allEvents} />}/>
                    </Switch>
                </Router>
            </div>
            }

            
           

            
        </div>


    );
};

export default Assess;