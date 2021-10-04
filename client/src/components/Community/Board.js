import React,{useEffect} from 'react';
import axios from 'axios';

const Board = ({match}) => {
    const {forumId} = match.params;

    useEffect(() => {
        axios.get(`/Community/${forumId}/1`)
        .then(res => {
            console.log(res.data)
        }
        )
        .catch()
    },[])

    return (
        <div>
           {forumId}
        </div>
    );
};

export default Board;