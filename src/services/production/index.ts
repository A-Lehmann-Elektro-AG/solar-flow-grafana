import DataFetcher from "../energyFlowCore/dataFetcher";

export interface BarData {
  name: string;
  kWh: number;
}

const getMonthData = async (): Promise<number[]> => {
  const monthData: number[] = [];
  const dailyProduction = await DataFetcher.fetchDailyData();
  for (let i = 0; i <= dailyProduction.length + 2; i++) {
    if (i + 1 <= dailyProduction.length - (new Date().getDate())) {
      continue;
    }
    monthData.push(dailyProduction[i]);
  }
  return monthData;
}

export async function getDailyProduction() {
  const monthValues = await getMonthData();
  const newMonthData: BarData[] = [];
  for (let i = 0; i <= 30; i++) {
    let name = `${i + 1}.${new Date().getMonth() + 1}`;
    if (i % 2 !== 0) {
      name = "";
    }
    if (i >= monthValues.length) {
      newMonthData.push({name: name, kWh: 0});
      continue;
    }
    const value = monthValues[i];
    newMonthData.push({name, kWh: value / 1000});
  }
  return newMonthData;
}