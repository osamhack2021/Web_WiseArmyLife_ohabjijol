import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'


const submitClick = async data => {
    axios.post('/auth/join', data)
        .then(response => {
            alert(response.data)
        })
}

const Auth = () => {
    const [inputs, setInputs] = useState({
        user_id: null,
        user_name: null,
        user_pw: null,
        position: null,
        isExecutive: null,
        pw1: null,
        pw2: null
    });



    const { user_id, user_name, user_pw, position, isExecutive, pw1, pw2 } = inputs;

    const onChange = (e) => {
        if(isExecutive===null){
            return alert("병사 간부 구분을 먼저 선택하세요");
        }
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onClick = async (e) => {
        e.preventDefault();

        if (pw1 === pw2) {
            setInputs({
                ...inputs,
                user_pw: pw1
            })
        } else {
            alert('비밀번호가 다릅니다.')
            return;
        }




        const data = {
            'militaryNumber': user_id,
            'name': user_name,
            'password': pw1,
            'position': position,
            'isExecutive': isExecutive
        }
        console.log(data)

        if(user_id== null,
            user_name==null,
            position== null,
            isExecutive== null,
            pw1== null,
            pw2== null){
                alert("모든 항목을 입력하십시오.")
                return;
            }

        axios.post('/auth/join', data)
            .then(response => {
                console.log(data);
                if (response.data.success === true) {
                    alert('가입성공')
                    
                    document.location.href = '/'
                } else {
                    alert('가입실패')
                }

            })
    }



    const exTrue = () => {
        setInputs({
            isExecutive: true
        })

        const a = document.getElementsByClassName("idInput");
        const b = document.getElementsByClassName("idInput2");

        if(a[0]!==undefined)
        a[0].disabled = false;
        if(a[1]!==undefined)
        a[1].disabled = false;
        if(a[2]!==undefined)
        a[2].disabled = false;
        if(a[3]!==undefined)
        a[3].disabled = false;
        if(b[0]!==undefined)
        b[0].disabled = false;



    }

    const exFalse = () => {
        const a = document.getElementsByClassName("idInput");
        const b = document.getElementsByClassName("idInput2");

        if(a[0]!==undefined)
        a[0].disabled = false;
        if(a[1]!==undefined)
        a[1].disabled = false;
        if(a[2]!==undefined)
        a[2].disabled = false;
        if(a[3]!==undefined)
        a[3].disabled = false;
        if(b[0]!==undefined)
        b[0].disabled = false;


        setInputs({
            isExecutive: false
        })


    }
  

    const set1 = () => {
        
        setInputs({
            ...inputs,
            position: "일반간부"
        })
    }

    const set2 = () => {
        setInputs({
            ...inputs,
            position: "중대장"
        })
    }
    const set3 = () => {
        setInputs({
            ...inputs,
            position: "주임원사"
        })
    }

    const checkisExecutive = ()=>{
        if(isExecutive===undefined){
            return alert("병사 간부 구분을 먼저 선택하세요");
        }

    }

 

    return (
        <div>
            <div className="marginBox71" />
            <span className="textSignup">회원가입 +</span>
            <div>
                <input className="exeInput1" type="radio" name="selectEx" onClick={exTrue} />
                <span className="exeText">간부</span>
                <input className="exeInput2" type="radio" name="selectEx" onClick={exFalse} />
                <span className="exeText">병사</span>
            </div>

            <div className="signupForm">
                <form>
                    <div className="marginBox71" />
                    <span className="unit">1. 군번</span>
                    <div className="marginBox48" />
                    <input className="idInput" placeholder="군번" disabled name="user_id" value={user_id} onClick = {checkisExecutive} onChange={onChange} />
                    <div className="marginBox48" />

                    <span className="unit">2. 이름</span>
                    <div className="marginBox48" />
                    <input className="idInput" placeholder="이름" disabled  name="user_name" value={user_name} onClick = {checkisExecutive}onChange={onChange} />
                    <div className="marginBox71" />

                    <span className="unit">3. 비밀번호</span>
                    <div className="marginBox48" />
                    <input className="idInput2" placeholder="비밀번호"disabled name="pw1" type='password'value={pw1} onClick = {checkisExecutive}onChange={onChange} />
                    <input className="idInput" placeholder="비밀번호 확인"disabled name="pw2" type='password' value={pw2} onClick = {checkisExecutive}onChange={onChange} />
                    <div className="marginBox71" />


                    <span className="unit">4. 직책</span>
                    <div className="marginBox48" />

                    {
                        isExecutive == false ||  isExecutive == null
                        ? <div>
                            <input className="idInput" placeholder="직책" disabled name="position" value={position} onClick = {checkisExecutive} onChange={onChange} /></div>
                            : <div>

                                <input className="exeTypeInput" type="radio" name="selectEx1" onClick={set1} />
                                <span className="exeTypeText">일반간부</span>
                                <input className="exeTypeInput" type="radio" name="selectEx1" onClick={set2} />
                                <span className="exeTypeText">중대장</span>
                                <input className="exeTypeInput" type="radio" name="selectEx1" onClick={set3} />
                                <span className="exeTypeText">대대장/주임원사</span>

                            </div>
                    }



                    <div className="marginBox48" />
                    <div className="marginBox48" />
                    <span className="totalSignup" onClick={onClick}>회원가입</span>
                </form>
            </div>
        </div>

        
    );
};

export default Auth;