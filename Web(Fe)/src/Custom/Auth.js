import axios from "axios";

export function signIn({ user_id, user_pw}) {

    if(user_pw==1){
        alert('로그인 성공')
        sessionStorage.setItem('login_info',true);
        return {user_id,user_pw};
    }else{
        throw new Error();
    }

    /*
    axios.post('./auth/login',{
        user:{militaryNumber:user_id,password:user_pw}
    })
    .then(respoense =>{
        alert('로그인 성공')
        sessionStorage.setItem('login_info',true);
        return {user_id,user_pw};
    })

    
    return null;
    */
  }

/*
export const submitLogin = async ({user_id,user_pw}, tset=false) => {


    if (test){
        alert('테스트 로그인 성공')
        sessionStorage.setItem('login_info',true)
    }else{
        axios.post('/auth/login', {
        militaryNumber:user_id,
        password:user_pw
        }) 
        .then( response => {
            alert(`id:$(militaryNumber) pw:$(password))`)
            if(response.data.success){
                alert('로그인 성공');
                localStorage.setItem('login_info','true')
                setInputs(true);
            }  
            else{
                alert('로그인 실패');
            }
        })
    }
}

*/