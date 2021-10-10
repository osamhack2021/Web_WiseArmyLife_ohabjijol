import React,{useEffect,useState} from 'react';
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



// 사격 화생방 구급법 각개 주특기 체력
const targetList = [
    'shooting',
    'cBR',
    'firstAid',
    'individualBattle',
    'speciality',
    'strength'
]

const Assess = () => {
    //
    const [isExecutive,setIsExecutive] = useState(false)
    const [allEvents, setAllEvents] = useState([]);


    useEffect(() => {
        const Tf = sessionStorage.getItem('isExecutive')
        if(Tf === 'true'){
            setIsExecutive(true)
        }else{
            setIsExecutive(false)
        }
        async function getEvents() {
            const res1 = await axios.get(`/assessment/shooting`) // 두개뜸
            const res2 = await axios.get(`/assessment/cBR`) // 적용안됨
            const res3 = await axios.get(`/assessment/firstAid`) 
            const res4 = await axios.get(`/assessment/individualBattle`)
            const res5 = await axios.get(`/assessment/speciality`)
            const res6 = await axios.get(`/assessment/strength`)
            
            const getData = [
                ...res1.data.data,
                ...res2.data.data,
                ...res3.data.data,
                ...res4.data.data,
                ...res5.data.data,
                ...res6.data.data
            ];
            console.log(getData)
            const inDateList = getData.map( res=> {
                return {
                    date : new Date(res.date),
                    title : res.time+" "+res.number_of_applicant+"/"+res.applicant_capacity,
                    expired : res.expired,
                    allDay:true,
                    dd: res.date
                }
            })
            setAllEvents([...inDateList])
        }
        getEvents()
    },[])

    const onRangeChange = async (e)=>{
        const year = e.start.getFullYear();
        const month = parseInt(('0' + (e.start.getMonth() + 1)).slice(-2))+parseInt(1);

        const res1 = await axios.get(`/assessment/shooting?year=${year}?month=${month}`)
        const res2 = await axios.get(`/assessment/cBR?year=${year}?month=${month}`)
        const res3 = await axios.get(`/assessment/firstAid?year=${year}?month=${month}`)
        const res4 = await axios.get(`/assessment/individualBattle?year=${year}?month=${month}`)
        const res5 = await axios.get(`/assessment/speciality?year=${year}?month=${month}`)
        const res6 = await axios.get(`/assessment/strength?year=${year}?month=${month}`)

        const getData = [
            ...res1.data.data,
            ...res2.data.data,
            ...res3.data.data,
            ...res4.data.data,
            ...res5.data.data,
            ...res6.data.data
        ];

        const inDateList = getData.map( res=> {
            return {
                target : res.target,
                date : new Date(res.date),
                title : res.target+" " +res.time+" "+res.number_of_applicant+"/"+res.applicant_capacity,
                expired : res.expired,
                allDay:true
            }
        })
        setAllEvents([...inDateList])
    
    }

    
    return (
        <div>
            <h2 className="basicTitle">병기본평가 +</h2>

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
                        <Route path="/assess" render={ () => <ExeSubmit onRangeChange={onRangeChange} allEvents={allEvents} />}/>
                    </Switch>
                </Router>
            </div>
            :
            <div>
                <Router>
                    <div className="assessLinkBox">
                        <Link className="assessLink" to="/assess/submit">평가일정등록 </Link>
                        <Link className="assessLink" to="/assess/current">신청결과확인 </Link>
                        <Link className="assessLink" to="/assess/result">평가결과확인 </Link>
                    </div>
                    <Switch>
                        <Route path="/assess/current" render={()=><Current />}/>
                        <Route path="/assess/result" component={Result }/>
                        <Route path="/assess" render={ () => <Submit onRangeChange={onRangeChange} allEvents={allEvents} />}/>
                    </Switch>
                </Router>
            </div>
            }

            
           

            
        </div>


    );
};

export default Assess;