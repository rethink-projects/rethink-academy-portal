import React, { PureComponent, useEffect, useState } from "react";
import styles from "./BarChart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export const data = [
  {
    name: "Jun/21",
    skill: 2,
    pv: 0,
  },
  {
    name: "Jul/21",
    skill: 3,
    pv: 0,
  },
  {
    name: "Ago/21",
    skill: 3,
    pv: 0,
  },
  {
    name: "Set/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Out/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Nov/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Dez/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Jan/22",
    skill: 5,
    pv: 0,
  },
  {
    name: "Fev/22",
    skill: 0,
    pv: 1,
  },
  {
    name: "Mar/22",
    skill: 0,
    pv: 1,
  },
  {
    name: "Abr/22",
    skill: 0,
    pv: 1,
  },
  {
    name: "Mai/22",
    skill: 0,
    pv: 1,
  },
];

export const dataDois = [
  {
    name: "Jun/21",
    skill: 3,
    pv: 0,
  },
  {
    name: "Jul/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Ago/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Set/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Out/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Nov/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Dez/21",
    skill: 4,
    pv: 0,
  },
  {
    name: "Jan/22",
    skill: 5,
    pv: 0,
  },
  {
    name: "Fev/22",
    skill: 0,
    pv: 1,
  },
  {
    name: "Mar/22",
    skill: 0,
    pv: 1,
  },
  {
    name: "Abr/22",
    skill: 0,
    pv: 1,
  },
  {
    name: "Mai/22",
    skill: 0,
    pv: 1,
  },
];

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

const CustomBarChart = ({
  graphData,
  hours,
}: {
  graphData: any;
  hours?: boolean;
}) => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
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
        {hours ? (
          <YAxis type="number" domain={[0, 5]} tickCount={6} />
        ) : (
          <YAxis type="category" domain={months} tickCount={12} />
        )}
        <Tooltip cursor={false} content={CustomTooltip} />
        <Bar
          dataKey={!hours ? "skill" : "hours"}
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
