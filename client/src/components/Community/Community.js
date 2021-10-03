import React,{useEffect,useState} from 'react';
import axios from 'axios';


// match.params 사용
// 
const Community = ({match}) => {
    const [data,setData] = useState(null);
    
    useEffect(() => {
        const {forumId,pageIndex,postId} =match.params;
        if(postId !==undefined){ // 특정게시판 특정 글
            axios.get(`/Community/${forumId}/v/${postId}`)
            .then(res => {
                console.log(res)
                setData(res);
            })
        } else if(pageIndex !==undefined){ // 특정게시판 특정페이지
            axios.get(`/Community/${forumId}/${pageIndex}`)
            .then(res => {
                console.log(res)
                setData(res);
            })
        } else if( forumId !==undefined){ // 특정게시판 첫페이지
            axios.get(`/Community/${forumId}/1`)
            .then(res => {
                console.log(res)
                setData(res);
            })
        } else{ // 그냥 커뮤니티
            axios.get(`/Community`)
            .then(res => {
                console.log(res)
                setData(res);
            })
        }
    },[])
    
    return (
        <div>
            커뮤니티 data : {data}
        </div>
    );
};

export default Community;