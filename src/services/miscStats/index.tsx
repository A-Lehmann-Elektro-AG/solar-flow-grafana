import React, {useEffect, useState} from 'react';
import "./index.css"
import DataFetcher from "../../services/energyFlowCore/dataFetcher";
import {getDailyProduction} from "../../services/production";


const MiscStats: React.FC = () => {
  const [selfConsumptionRate, setSelfConsumptionRate] = useState<number>(0);
  const [autarky, setAutarky] = useState<number>(0);
  const [co2Reduction, setCo2Reduction] = useState<number>(0);


  async function updateStats() {
    setAutarky(await DataFetcher.fetchAutarkyData());
    setSelfConsumptionRate(await DataFetcher.fetchEfficiencyData());

    const monthDailyData = await getDailyProduction();
    let dailyData = 0;
    for (let i = 0; i < monthDailyData.length; i++) {
      if (monthDailyData[i].kWh > 0 && monthDailyData[i].kWh !== null) {
        dailyData += monthDailyData[i].kWh;
      }
    }

    const co2Reduction = ((dailyData * 0.846) / 2240);
    setCo2Reduction(Math.round(co2Reduction * 10) / 10);
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateStats();
    }, 180000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      await updateStats();
    })();
  }, []);

  return (
    <div className="w-auto statistic node misc-stats">
      <div className="statistics-container">
        <div className="statistic">
          <h4>Eigenverbrauchsquote</h4>
          <p>{selfConsumptionRate}%</p>
        </div>
        <div className="statistic">
          <h4>Autarkiegrad</h4>
          <p>{autarky}%</p>
        </div>
        <div className="statistic">
          <h4>CO₂ Reduktion</h4>
          <p>{co2Reduction}t</p>
        </div>
        <p className="title">Monatliche Statistiken</p>
      </div>
    </div>
  );
};

export default MiscStats;
