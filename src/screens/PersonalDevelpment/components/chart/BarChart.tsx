import React, { PureComponent } from "react";
import styles from "./BarChart.module.css"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jun/21",
    Pesquisa: 2,
    pv: 0,
  },
  {
    name: "Jul/21",
    Pesquisa: 3,
    pv: 0,
  },
  {
    name: "Ago/21",
    Pesquisa: 3,
    pv: 0,
  },
  {
    name: "Set/21",
    Pesquisa: 4,
    pv: 0,
  },
  {
    name: "Out/21",
    Pesquisa: 4,
    pv: 0,
  },
  {
    name: "Nov/21",
    Pesquisa: 4,
    pv: 0,
  },
  {
    name: "Dez/21",
    Pesquisa: 4,
    pv: 0,
  },
  {
    name: "Jan/22",
    Pesquisa: 5,
    pv: 0,
  },
  {
    name: "Fev/22",
    Pesquisa: 0,
    pv: 1,
  },
  {
    name: "Mar/22",
    Pesquisa: 0,
    pv: 1,
  },
  {
    name: "Abr/22",
    Pesquisa: 0,
    pv: 1,
  },
  {
    name: "Mai/22",
    Pesquisa: 0,
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

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/stacked-bar-chart-s47i2";

  render() {
    return (
      <ResponsiveContainer width="100%" height="65%">
        <BarChart
          width={500}
          height={200}
          data={data}
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
            dataKey="Pesquisa"
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
  }
}
