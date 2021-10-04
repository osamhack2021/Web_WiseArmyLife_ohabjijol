import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';


// match.params 사용
// 
const Community = ({match}) => {
    const [data,setData] = useState({
        'count':100,
        'rows':[]
    });
    const {count,rows} = data;
    const test = useRef(0);


    useEffect(() => {
        const {forumId,pageIndex,postId} =match.params;
        if(postId !==undefined){ // 특정게시판 특정 글
            axios.get(`/Community/${forumId}/v/${postId}`)
            .then(res => {
                console.log('hello');
                const {allForum} = res.data.data;
                console.log(allForum);
                console()
                setData(res.data.data);
            })
        } else if(pageIndex !==undefined){ // 특정게시판 특정페이지
            axios.get(`/Community/${forumId}/${pageIndex}`)
            .then(res => {
                console.log(res.data)
                setData(res.data.data);
            })
        } else if( forumId !==undefined){ // 특정게시판 첫페이지
            axios.get(`/Community/${forumId}/1`)
            .then(res => {
                console.log(res.data)
                
                setData(res.data.data);
            })
        } else{ // 그냥 커뮤니티
            axios.get('/Community')
            .then(res =>{
                test.current=res.data.data.allForum;
                if(test.current.count != data.count){
                    setData(test.current)
                }
            })
        }
    },[data])

    const onClick = ()=>{
        axios.post('/Community/forumAdd',{
            'forumName':'공지사항'
        })
        .then(res =>{
            console.log(res.data)
        })
    }

    return (
        <div>
            
            <button onClick={onClick}>게시판등록</button>
        </div>
    );
};

export default Community;