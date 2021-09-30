import React from 'react';
 
function Main() {
	// App 컴포넌트에서 전달받은 props 값은 아래와 같이 받아온다.

    
    const onLogout = () => {
    	// sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
        sessionStorage.removeItem('user_id')
        // App 으로 이동(새로고침)
        document.location.href = '/'
    }
 
    return(
        <div>
            <div>
                <button type='button' onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}
 
export default Main;