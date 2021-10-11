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

  useEffect(() => {
    const canvas = chartRef.current.getContext("2d");

    

    new Chart(canvas, config);
  }, []);

  return <canvas className="chartCanvas" ref={chartRef} />;
}
