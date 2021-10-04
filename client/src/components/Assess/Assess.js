import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './ss.css'
import './Assess.css'
const Assess = () => {

    const [target,setTarget] = useState("사격");
    const [isExecutive,setIsExecutive] = useState(false)
    const onChange = (e)=>{
        const {value} = e.target;
        setTarget(value);
        console.log(target)
    }

    useEffect(() => {
        const Tf = sessionStorage.getItem('isExecutive')
        
        console.log(Tf)

        if(Tf === 'true'){
            setIsExecutive(true)
            console.log('확인')
        }else{
            setIsExecutive(false)
        }
    })


    return (
        <div>
            <h2 className="basicTitle">병기본평가 +</h2>
            <div>
                {isExecutive ? <button>추가하기</button> :null}
            </div>
            <span className="basicList" >
                <span className="margin270"></span>
                <input onChange={onChange} id="scale0" class="scale" name="scale" type="radio" value="사격" />
                <label for="scale0" class="button">사격</label>
                <input onChange={onChange} id="scale1" class="scale" name="scale" type="radio" value="정신전력병가" />
                <label for="scale1" class="button">정신전력평가</label>
                <input onChange={onChange} id="scale2" class="scale" name="scale" type="radio" value="체력" />
                <label for="scale2" class="button">체력</label>
                <input onChange={onChange} id="scale3" class="scale" name="scale" type="radio" value="화생방" />
                <label for="scale3" class="button">화생방</label>
                <input onChange={onChange} id="scale4" class="scale" name="scale" type="radio" value="각개전투" />
                <label for="scale4" class="button">각개전투</label>
                <input onChange={onChange} id="scale5" class="scale" name="scale" type="radio" value="주특기" />
                <label for="scale5" class="button">주특기</label>
            </span>

            

        </div>


    );
};

export default Assess;