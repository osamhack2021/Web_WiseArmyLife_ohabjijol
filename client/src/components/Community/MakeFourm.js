import React,{useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PublicRoute from './../../Custom/PublicRoute';
import { isLogin } from './../../Custom/isLogin';
import Community from './Community';
import Executive from './../Assess/Executive';
import Board from './Board';


const MakeFourm = ({data}) => {

    const [url,setUrl] = useState(null);

    const onClick = (e)=>{
        console.log(e.target.id);
        setUrl(true)

    }
    return (
        <div>
            <Router>
                {data.map(row=>
                        <div>
                            <Link onClick={onClick} to={`/Community/${row.id}`} id={row.id} >{row.forumName}</Link>
                        </div>
                )}
                
                <Route exact path="/Community/:forumId" component={Board}></Route>
            </Router>
        </div>
    );
};

export default MakeFourm;