import React,{useEffect} from 'react';
import axios from 'axios';
import Chart from "./Chart";
import './Chart.css'

const Result = () => {

    return (
        <div className='chartFirst'>
            <Chart id="chart"/>
        </div>
    );
};

export default Result;