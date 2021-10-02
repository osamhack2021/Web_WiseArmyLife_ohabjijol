import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BoardList from "./Sections/BoardList";
import { Button, Typography } from "antd";
const { Title } = Typography;

function BoardPage() {
  
  
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div>
        <Link to="/register?isForEdit=false">
          <button >New Post</button>
        </Link>
      </div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title>커뮤니티</Title>
      </div>
      <div>
        <BoardList
          />
          
      </div>
    </div>
  );
}

export default BoardPage;
