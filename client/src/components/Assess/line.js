import React from "react";
import { ResponsiveLine } from "@nivo/line";
import data from "./data";

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
const Line = () => (
  <ResponsiveLine
    data={data}
    colors={{ scheme: "category10" }}
    margin={{
      top: 50,
      right: 110,
      bottom: 50,
      left: 60
    }}
    xScale={{
      type: "time",
      format: "%Y-%m-%d"
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      stacked: false
    }}
    axisLeft={{
      legend: "linear scale",
      legendOffset: -50
    }}
    axisBottom={{
      format: "%b %d",
      tickValues: "every month",
      legend: "time scale",
      legendOffset: 40
    }}
    curve="monotoneX"
    enableGridX={false}
    enableGridY={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel={function(e) {
      console.log(e.x);
      return e.x + ":" + e.y;
    }}
    pointLabelYOffset={-12}
    enableSlices="x"
    crosshairType="x"
    useMesh={true}
    legends={[
      {
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    sliceTooltip={({ slice }) => {
      return (
        <div
          style={{
            background: "white",
            padding: "9px 12px",
            border: "1px solid #ccc"
          }}
        >
          <div>x: {slice.id}</div>
          {slice.points.map(point => (
            <div
              key={point.id}
              style={{
                color: point.serieColor,
                padding: "3px 0"
              }}
            >
              <strong>{point.serieId}</strong> [{point.data.yFormatted}] [
              {point.data.xFormatted}]
            </div>
          ))}
        </div>
      );
    }}
  />
);

export default Line;
