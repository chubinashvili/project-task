import React, { useEffect, useState } from "react";

// UI
import { Pie } from "@ant-design/charts";

// store
import { useStore } from "../../store";

// styles
import styles from "./InfoChart.module.css";

// types
interface ChartData {
  type: string;
  value: number;
}

const InfoChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [animate, setAnimate] = useState<boolean>(false);
  const { tableData } = useStore();

  const processData = () => {
    const cityCounts: { [key: string]: number } = {};
    tableData.forEach((item) => {
      const city = item.address.city;
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    const chartData = Object.keys(cityCounts).map((city) => ({
      type: city,
      value: cityCounts[city],
    }));
    setChartData(chartData);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    processData();
  }, [tableData]);

  const config = {
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
  };

  return (
    <section className={`${styles.main} ${animate ? styles.animate : ""}`}>
      <header className={styles.header}>
        <h1 className={`font-51`}>Info Chart</h1>
      </header>
      <Pie {...config} className={styles.chart} />
    </section>
  );
};

export default InfoChart;
