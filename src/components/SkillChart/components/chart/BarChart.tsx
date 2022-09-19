import React from "react";
import styles from "./BarChart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className="label">{label}</p>
        <p>{`${payload[0].dataKey}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomBarChart = ({ graphData }: { graphData: any }) => {
  return (
    <ResponsiveContainer width="100%" height="65%">
      <BarChart
        width={500}
        height={200}
        data={graphData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 5]} tickCount={6} />
        <Tooltip cursor={false} content={CustomTooltip} />
        <Bar
          dataKey="skill"
          stackId="a"
          fill="#82A8F8"
          barSize={40}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="pv"
          stackId="a"
          fill="#D4D4D4"
          barSize={40}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
