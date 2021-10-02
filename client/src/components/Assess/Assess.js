import React, { useState ,useEffect} from "react";
import Executive from "./Executive";
import Normal from "./Normal";
import axios from "axios";

function Assess() {

    const [data,setData] = useState(false);
    const {isEx} = data;

    useEffect(() => {
        axios.get(`/assessment`)
        .then(res => {
            console.log(res)
            setData(res);
        })
    })
        
        

    return (
        <React.Fragment>        
            {isEx ? <Executive /> : <Normal />}
        </React.Fragment>
    );
}
    


export default Assess;