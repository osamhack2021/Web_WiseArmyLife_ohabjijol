import React,{useState} from 'react';
import axios from 'axios';
import './Auth.css'


const submitClick = async data => {
    axios.post('/auth/join',data)
    .then( response => {
        alert(response.data)
    })  
}
const Auth = () => {
    const [inputs, setInputs] = useState({
        user_id:'',
        user_name:'',
        user_pw:'',
        position:'',
        isExecutive:'',
        pw1:'',
        pw2:''
    })

    

    const {user_id,user_name,user_pw,position,isExecutive,pw1,pw2} = inputs;

    const onChange = (e) =>{
        const {name,value} = e.target;

        setInputs({
            ...inputs,
            [name]:value
        })
    }
    const onClick= async(e)=>{
        e.preventDefault();

        if(pw1===pw2){
            setInputs({
                ...inputs,
                user_pw:pw1
            })
        }else{
            alert('비밀번호가 다릅니다.')
            return;
        }


        const data = {
            'militaryNumber':user_id,
            'name':user_name,
            'password' :user_pw,
            'position' :position,
            'isExecutive':isExecutive
        }
        axios.post('/auth/join',data)
        .then( response => {
            console.log(data);
            if(response.data.success===true){
                document.location.href = '/'
            }else{
                console.log('가입실패');
            }
    })  
    }

    const exTrue = () =>{
        setInputs({
            isExecutive:true
        })
    }

    const exFalse = () =>{
        setInputs({
            isExecutive:false
        })
    }
    
    return (
        <div>
            <div className="marginBox71" />
            <span className="textSignup">회원가입 +</span>
            <div>
                <input className="exeInput1" type="radio" name="selectEx" onClick={exTrue} />
                <span className="exeText">간부</span>
                <input className="exeInput2" type="radio"  name="selectEx" onClick={exFalse} />
                <span className="exeText">병사</span>
            </div>
            <div  className="signupForm">
                <form>
                    <div className="marginBox71" />
                    <span className="unit">1. 군번</span>
                    <div className="marginBox48" />
                    <input className="idInput" placeholder="군번" name="user_id" value={user_id} onChange={onChange}/>
                    <div className="marginBox48" />

                    <span className="unit">2. 이름</span>
                    <div className="marginBox48" />
                    <input  className="idInput" placeholder="이름" name="user_name" value={user_name} onChange={onChange}/>
                    <div className="marginBox71" />

                    <span className="unit">3. 비밀번호</span>
                    <div className="marginBox48" />
                    <input  className="idInput2" placeholder="비밀번호" name="pw1" value={pw1} onChange={onChange}/>
                    <input  className="idInput" placeholder="비밀번호 확인" name="pw2" value={pw2} onChange={onChange}/>
                    <div className="marginBox71" />

                    <span className="unit">4. 직책</span>
                    <div className="marginBox48" />
                    <input className="idInput" placeholder="직책" name="position" value={position} onChange={onChange}/>
                    <div className="marginBox48" />
                    <div className="marginBox48" />
                    <span className="totalSignup" onClick={onClick}>회원가입</span>
                </form>
            </div>
        </div>
    );
};

export default Auth;