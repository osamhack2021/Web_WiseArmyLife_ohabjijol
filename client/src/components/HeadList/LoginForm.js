import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function LoginForm({ authenticated, login, location }) {
  const [user_id, setUserId] = useState("");
  const [user_pw, setUserPw] = useState("");

  const handleClick = () => {
    try {
      login({ user_id, user_pw });
    } catch (e) {
      alert("Failed to login");
      setUserId("");
      setUserPw("");
    }
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <>
      <h1>Login</h1>
      <input
        value={user_id}
        onChange={({ target: { value } }) => setUserId(value)}
        type="text"
        placeholder="아이디 :"
      />
      <input
        value={user_pw}
        onChange={({ target: { value } }) => setUserPw(value)}
        type="password"
        placeholder="비밀번호 : "
      />
      <button onClick={handleClick}>Login</button>
    </>
  );
}

export default LoginForm;