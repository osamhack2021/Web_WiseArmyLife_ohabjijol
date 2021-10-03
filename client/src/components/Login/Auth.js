import React,{useState} from 'react';
import axios from 'axios';



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
        isExecutive:''
    })

    const {user_id,user_name,user_pw,position,isExecutive} = inputs;

    const onChange = (e) =>{
        const {name,value} = e.target;

        setInputs({
            ...inputs,
            [name]:value
        })
    }
    const onClick= async(e)=>{
        e.preventDefault();
        const data = {
            'militaryNumber':user_id,
            'name':user_name,
            'password' :user_pw,
            'position' :position,
            'isExecutive':isExecutive
        }
        axios.post('/auth/join',data)
        .then( response => {
            if(response.data.success===true){
                document.location.href = '/'
            }else{
                console.log('가입실패');
            }
    })  
    }

    
    return (
        <form>
            <input placeholder="군번" name="user_id" value={user_id} onChange={onChange}/>
            <input placeholder="이름" name="user_name" value={user_name} onChange={onChange}/>
            <input placeholder="비밀번호" name="user_pw" value={user_pw} onChange={onChange}/>
            <input placeholder="직책" name="position" value={position} onChange={onChange}/>
            <input placeholder="간부" name="isExecutive" value={isExecutive} onChange={onChange}/>

            <button onClick={onClick}>회원가입</button>
        </form>
    );
};

export default Auth;