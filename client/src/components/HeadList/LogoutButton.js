import React from "react";
import { withRouter } from "react-router-dom";

function LogoutButton({ history }) {
  

  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      sessionStorage.removeItem('user_id')
      // App 으로 이동(새로고침)
      document.location.href = '/'
  }

  const handleClick = () => {
    onLogout();
    history.push("/");
  };
  return <button onClick={handleClick}>Logout</button>;
}

export default withRouter(LogoutButton);