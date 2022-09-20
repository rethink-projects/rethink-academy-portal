import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomBarChart, { data } from "./components/chart/BarChart";
import Switch from "./components/switch/Switch";
import Tag, { headers } from "./components/tags/Tag";
import styles from "./TagChart.module.css";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/backend/Api";

type TagChartProps = {
  tags: string;
  setTags: (value: string) => void;
  graphData: {
    name: string;
    skill: number;
    pv: number;
  }[];
};

const TagChart = ({ tags, setTags, graphData }: TagChartProps) => {
  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.graph_container}>
        <div className={styles.graph_inner_container}>
          <Tag tags={tags} setTags={setTags} />
          <div className={styles.card_content_line} />
        </div>
        <CustomBarChart graphData={graphData} hours={true} />
      </div>
    </div>
  );
};

export default TagChart;
