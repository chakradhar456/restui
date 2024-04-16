import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";


const valueFormatter = (value) => `${value} people`;



export default function TickPlacementBars(props) {
  const dataset = props.values;
  const [tickPlacement, setTickPlacement] = React.useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");
  const chartSetting = {
    yAxis: [
      {
        label: "Number Of People",
      },
    ],
    series: [{ dataKey: "value", label: props.maximumStrength, valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };
  return (
    <div style={{ width: "50%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "session",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
