import React, { useRef, useEffect,useState } from "react";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import axios from "axios";

const defaultConfig = {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "사격",
        fill: false,
        borderColor: "Red",
        showLine: true,
        data: [{x:2,y:60},
          {x:4,y:45},
          {x:7,y:75},
          {x:9,y:100},
          {x:10,y:90},
        ]
      },
      {
        label: "화생방",
        fill: false,
        borderColor: "Orange",
        showLine: true,
        data: [
        ]
      },
      {
        label: "구급법",
        fill: false,
        borderColor: "Yellow",
        showLine: true,
        data: [
          {x:1,y:60},
          {x:2,y:80},
          {x:5,y:90},
          {x:7,y:90},
          {x:9,y:100},
        ]
      },
      {
        label: "각개전투",
        fill: false,
        borderColor: "Green",
        showLine: true,
        data: [
        ]
      },
      {
        label: "주특기",
        fill: false,
        borderColor: "Purple",
        showLine: true,
        data: [
          {x:2,y:70},
          {x:4,y:90},
          {x:7,y:100},
          {x:9,y:95},
          {x:10,y:100},
        ]
      },
      {
        label: "체력",
        fill: false,
        borderColor: "Black",
        showLine: true,
        data: [
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

    const [config,setConfig] = useState(defaultConfig)

    const setData = (dataList)=>{
        setConfig({
            ...config,
            data:{
                datasets: [
                    {
                      label: "사격",
                      fill: false,
                      borderColor: "Red",
                      showLine: true,
                      data: dataList[0]
                    },
                    {
                      label: "화생방",
                      fill: false,
                      borderColor: "Orange",
                      showLine: true,
                      data: dataList[1]
                    },
                    {
                      label: "구급법",
                      fill: false,
                      borderColor: "Yellow",
                      showLine: true,
                      data: dataList[2]
                    },
                    {
                      label: "각개전투",
                      fill: false,
                      borderColor: "Green",
                      showLine: true,
                      data: dataList[3]
                    },
                    {
                      label: "주특기",
                      fill: false,
                      borderColor: "Purple",
                      showLine: true,
                      data: dataList[4]
                    },
                    {
                      label: "체력",
                      fill: false,
                      borderColor: "Black",
                      showLine: true,
                      data: dataList[5]
                    }
                  ]
            }
        })
    }

    const getYYYYMM = (date2)=>{
        const date = new Date(date2)

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateString = year + month  + day;
        return parseInt(dateString);
    }

    const test = useRef()
    useEffect(()=>{
        const canvas = chartRef.current.getContext("2d");

        new Chart(canvas, config);

        
        async function getEvents() {
            const ress1 = await axios.get(`/assessment/shooting/result`)
            const ress2 = await axios.get(`/assessment/cBR/result`)
            const ress3 = await axios.get(`/assessment/firstAid/result`)
            const ress4 = await axios.get(`/assessment/individualBattle/result`)
            const ress5 = await axios.get(`/assessment/speciality/result`)
            const ress6 = await axios.get(`/assessment/strength/result`)

            let [res1,res2,res3,res4,res5,res6] = await Promise.all([ress1,ress2,ress3,ress4,ress5,ress6]);


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
            const Data1 = res1.data.data.map(res=>{
                return(
                    {x:getYYYYMM(res.date),y:parseInt(res.score)}
                )
            })
            console.log(Data1)
            
            const getData = [
                res1.data.data.map(res=>{
                    return(
                        {x:getYYYYMM(res.date),y:parseInt(res.score)}
                    )
                }),
                res2.data.data.map(res=>{
                    return(
                        {x:getYYYYMM(res.date),y:parseInt(res.score)}
                    )
                }),
                res3.data.data.map(res=>{
                    return(
                        {x:getYYYYMM(res.date),y:parseInt(res.score)}
                    )
                }),
                res4.data.data.map(res=>{
                    return(
                        {x:getYYYYMM(res.date),y:parseInt(res.score)}
                    )
                }),
                res5.data.data.map(res=>{
                    return(
                        {x:getYYYYMM(res.date),y:parseInt(res.score)}
                    )
                }),
                res6.data.data.map(res=>{
                    return(
                        {x:getYYYYMM(res.date),y:parseInt(res.score)}
                    )
                })
            ];

            if(test.current !== getData.length){
                test.current = getData.length
                // setData(getData)
            }
            console.log(test.current)
            
            console.log(config)
        }
        getEvents()
    },[test.current])

  return <canvas className="chartCanvas" ref={chartRef} />;
}
