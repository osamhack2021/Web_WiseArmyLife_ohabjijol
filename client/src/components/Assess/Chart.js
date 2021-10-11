import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import axios from "axios";

const config = {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "shooting",
        fill: false,
        borderColor: "Red",
        showLine: true,
        data: [
          { x: 202104, y: 0 },
          { x: 202105, y: 80 },
          { x: 202108, y: 50 },
          { x: 202111, y: 70 }
        ]
      },
      {
        label: "cBR",
        fill: false,
        borderColor: "Black",
        showLine: true,
        data: [
          { x: 202105, y: 60 },
          { x: 202108, y: 100 },
          { x: 202111, y: 80 }
        ]
      }
    ]
  },
  options: {
    responsive:false,
    plugins: {
      annotation: {
        annotations: [
          {
            type: "line",
            display: true,
            scaleID: "x",
            value: 17,
            borderColor: "rgba(255, 0, 0, 0.5)",
            borderWidth: 2,
            label: {
              enabled: true,
              content: "Test"
            }
          }
        ]
      }
    }
  }
};

export default function MyChart() {
    const chartRef = useRef();

    useEffect(()=>{
        const canvas = chartRef.current.getContext("2d");

        new Chart(canvas, config);

        async function getEvents() {
            const res1 = await axios.get(`/assessment/shooting/result`)
            const res2 = await axios.get(`/assessment/cBR/result`)
            const res3 = await axios.get(`/assessment/firstAid/result`)
            const res4 = await axios.get(`/assessment/individualBattle/result`)
            const res5 = await axios.get(`/assessment/speciality/result`)
            const res6 = await axios.get(`/assessment/strength/result`)

            if(res1.data.data ===null){
                res1.data.data = []
            }
            if(res2.data.data ===null){
                res2.data.data = []
            }
            if(res3.data.data ===null){
                res3.data.data = []
            }
            if(res4.data.data ===null){
                res4.data.data = []
            }
            if(res5.data.data ===null){
                res5.data.data = []
            }
            if(res6.data.data ===null){
                res6.data.data = []
            }
            
            
            const getData = [
                res1.data.data,
                res2.data.data,
                res3.data.data,
                res4.data.data,
                res5.data.data,
                res6.data.data
            ];
            console.log(getData)


        }
        getEvents()
    },[])

  return <canvas className="chartCanvas" ref={chartRef} />;
}
