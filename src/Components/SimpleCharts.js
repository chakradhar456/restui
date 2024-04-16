import React, { useState } from "react";

import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function PieChartWithCustomizedLabel(props) {
  const data = props.values;

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}% ` + params.state;
  };
  return (
  <div>
    <PieChart 
      series={[
        {
          
          outerRadius: 100,
          data,
          arcLabel: getArcLabel,
         
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 12,
        },
      }}
      {...sizing}
      
    />
   </div>
  );
}
