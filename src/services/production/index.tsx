import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import React, {useEffect, useState} from "react";
import './index.css';
import {BarData, getDailyProduction} from "../../services/production";

const ProductionChart: React.FC = () => {
  const [monthProduction, setMonthProduction] = useState<BarData[]>([]);

  useEffect(() => {
    (async () => {
      setMonthProduction(await getDailyProduction());
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setMonthProduction(await getDailyProduction());
    }, 60 * 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-auto node production-chart">
      <BarChart width={900} height={630} data={monthProduction} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
        {/*<CartesianGrid strokeDasharray="9 9"/>*/}
        <Bar dataKey="kWh" barSize={20} fill={"#5ba7dc"}/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Legend/>
        <Tooltip/>
      </BarChart>
    </div>
  );
};

export default ProductionChart;
