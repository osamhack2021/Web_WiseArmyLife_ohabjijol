import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './ss.css'
import './Assess.css'


const Assess = () => {
    const [data,setData] = useState(null);
    const [target,setTarget] = useState("shooting");
    const [isExecutive,setIsExecutive] = useState(false)
    const onChange = (e)=>{
        const {value} = e.target;
        setTarget(value);
        console.log(target)
    }

    // 병기본평가 클릭시 또는 f5시 실행되는 함수
    useEffect(() => {
        const Tf = sessionStorage.getItem('isExecutive')
        if(Tf === 'true'){
            setIsExecutive(true)
        }else{
            setIsExecutive(false)
        }
    })

    // target 바뀔때 마다 실행되는 함수
    useEffect(()=>{
        axios.get(`/assessment/${target}`)
        .then( res =>{
            console.log(res.data);
            setData(res.data.data)
            console.log(data);
        })
        .catch(err=>{
            console.log(err)
        })

    },[target])

    return (
        <div>
            <h2 className="basicTitle">병기본평가 +</h2>
            <div>
                {isExecutive ? 
                    <form>
                        <input />
                        <button>추가하기</button> 
                    </form>
                :null}
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



        </div>


    );
};

export default Assess;