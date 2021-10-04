import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const board=[
  {
    "id": 1,
    "title": "이게 된다고 ? ",
    "content": "ㅋㅋㅋㅋ ",
    "views": 10,
    "date": 1633147307322,
    "editDate": 1633149877431
  },
  {
    "id": 2,
    "title": "두번쨰?",
    "content": "미치겠네 ㅋㅋ",
    "views": 5,
    "date": 1633147338427,
    "editDate": ""
  },
  {
    "id": 3,
    "title": "4",
    "content": "5",
    "views": 1,
    "date": 1633148122448,
    "editDate": ""
  },
  {
    "id": 4,
    "title": "1",
    "content": "4",
    "views": 1,
    "date": 1633149434392,
    "editDate": ""
  },
  {
    "id": 5,
    "title": "2",
    "content": "45",
    "views": 3,
    "date": 1633149479218,
    "editDate": ""
  }
]

function BoardList(props) {
  return (
    <div>
      <table style={{ width: "100%" }}>
        <colgroup>
          <col width="10%" />
          <col width="70%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <tbody>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>조회수</th>
            <th></th>
          </tr>
        </tbody>
        <tbody>
          {board.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>

              <td >
                {article.title}
                &nbsp;
              </td>

              <td>{article.views}</td>
              <td>
                <Button>
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardList;
